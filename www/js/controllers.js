angular.module('app.controllers', [])
  
.controller('pagaEuCtrl', ['$scope', '$state', '$stateParams', 'UsuarioService', '$ionicLoading', '$ionicModal', '$ionicPopup', '$rootScope', 'ContatoService',
function ($scope, $state, $stateParams, UsuarioService, $ionicLoading, $ionicModal, $ionicPopup, $rootScope, ContatoService) {
	/* LOADING FUNCTION */
	$scope.showLoading = function() {
		$ionicLoading.show()
	};
	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	/* END - LOADING FUNCTION */

	$scope.logout = function(){
		$state.go('login');
	}

	$scope.usuarioLogado = $rootScope.usuario;
	$scope.imagemUser = $rootScope.imagem;

	$scope.addContato = function(contato, id){
		if(contato == null || contato.username == null){
			var alertPopup = $ionicPopup.alert({
				title: 'Campo não preenchido',
				template: 'Digite o nome de usuário!'
			});
			alertPopup.then(function(res){});
			return;	
		}
		ContatoService.postContato(contato.username, id).then(function(response){
			if(response.status == 201){
				var alertPopup = $ionicPopup.alert({
					title: 'Contato criado',
					template: 'Contato criado com sucesso!'
				});
				$scope.atualizar($scope.usuarioLogado.id);			
			}else if(response.status == 404){
				var alertPopup = $ionicPopup.alert({
					title: 'Erro ao criar contato',
					template: 'Usuário inexistente!'
				});
			}
		})
	}

	$scope.atualizar = function(id){
		$scope.showLoading();
		ContatoService.getContatos(id).then(function(contatosData){
			$scope.contatosList = contatosData;
			$scope.hideLoading();
		});
		$scope.$broadcast('scroll.refreshComplete');
	}
	$scope.atualizar($scope.usuarioLogado.id);

	$scope.deletarContato = function(contato){
		console.log("Deletar > contato ", contato);
		var confirmPopup = $ionicPopup.confirm({
			title: 'Excluir contato',
			template: 'Tem certeza que deseja excluir o contato de '+ contato.nome + '?'
		});
		confirmPopup.then(function(res) {
		    if(res) {
		    	$scope.showLoading();
				ContatoService.deleteContato(contato)
				.then(function(response){
					$scope.atualizar();
				});
		    } else {
		       return;
		    }
		});
	}

	$scope.salvarContato = function(contato){
		console.log("Contato salvo > ", contato);
		$rootScope.contato = contato;
	}
}])
   
.controller('maracaCtrl', ['$scope', '$state', '$stateParams', '$rootScope', 'ContatoService', '$ionicLoading', '$ionicModal',
function ($scope, $state, $stateParams, $rootScope, ContatoService, $ionicLoading, $ionicModal) {
	/* LOADING FUNCTION */
	$scope.showLoading = function() {
		$ionicLoading.show()
	};
	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};
	/* END - LOADING FUNCTION */


	$scope.contatoAtual = $rootScope.contato;
	$scope.usuarioLogado = $rootScope.usuario;

	$ionicModal.fromTemplateUrl('my-modal-emprestimo.html', {
    	scope: $scope,
    	animation: 'slide-in-up'
  	}).then(function(modal) {
    	$scope.modal = modal;
  	});
  	$scope.openModal = function() {
    	$scope.modal.show();
  	};
  	$scope.closeModal = function() {
    	$scope.modal.hide();
  	};
  	// Cleanup the modal when we're done with it!
  	$scope.$on('$destroy', function() {
    	$scope.modal.remove();
  	});
  	// Execute action on hide modal
  	$scope.$on('modal.hidden', function() {
    	// Execute action
  	});
  	// Execute action on remove modal
  	$scope.$on('modal.removed', function() {
    	// Execute action
  	});

  	$scope.realizarEmprestimo = function(valor, idContato, idUsuario){
  		ContatoService.postEmprestimo(valor, idContato, idUsuario);
  		$state.go('pagaEu');
  	}

  	$scope.atualizarTransacoes = function(idUsuario, idContato){
  		$scope.showLoading();
  		ContatoService.getTransacoes(idUsuario, idContato).then(function(transacoesData){
			$scope.transacoes = transacoesData;
			$scope.hideLoading();
		});
		$scope.$broadcast('scroll.refreshComplete');	
  	}
  	$scope.atualizarTransacoes($scope.usuarioLogado.id, $scope.contatoAtual.id);

	$scope.atualizarContato = function(idContato){
		$scope.showLoading();
		ContatoService.getContato(idContato).then(function(contatoData){
			$scope.contato = contatoData;
			$scope.hideLoading();
		});
		$scope.$broadcast('scroll.refreshComplete');	
	}
	$scope.atualizarContato($scope.contatoAtual.id);
}])
   
.controller('loginCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', 'UsuarioService', '$rootScope',
function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, UsuarioService, $rootScope) {
	$scope.showLoading = function() {
		$ionicLoading.show()
	};

	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};

	$scope.logar = function(login){
		$scope.showLoading();
		if(login == null || login.email == null || login.senha == null){
			var alertPopup = $ionicPopup.alert({
				title: 'Campons não preenchidos',
				template: 'Preencha todos os campos!'
			});
			alertPopup.then(function(res){});
			return;
		}
		UsuarioService.getUsuario(login).then(function(response){
			if(response.status == 404){
				var alertPopup = $ionicPopup.alert({
					title: 'Usuário não encontrado',
					template: 'Email e/ou senha incorretos!'
				});
				$scope.hideLoading();
			}else if(response.status == -1){
				var alertPopup = $ionicPopup.alert({
					title: 'Erro de conexão',
					template: 'Por favor, verifique sua conexão!'
				});
				$scope.hideLoading();
			}else{
				$scope.hideLoading();
				$rootScope.usuario = response;
				$rootScope.imagem = "https://www.gravatar.com/avatar/" + md5(login.email);
				$state.go('pagaEu');
			}
		})
	}	
}])
   
.controller('criarContaCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', 'UsuarioService', '$rootScope',
function ($scope, $state, $stateParams, $ionicLoading, $ionicPopup, UsuarioService, $rootScope) {

	$scope.showLoading = function() {
		$ionicLoading.show()
	};

	$scope.hideLoading = function(){
		$ionicLoading.hide();
	};

	$scope.criarConta = function(usuario){
		if(usuario == null || usuario.username == null || usuario.senha == null || usuario.email == null || usuario.telefone == null || usuario.nome == null){
			var alertPopup = $ionicPopup.alert({
				title: 'Campons não preenchidos',
				template: 'Preencha todos os campos!'
			});
			alertPopup.then(function(res){});
			return;
		}

		$scope.showLoading();
		console.log("criar conta > usuario: ", usuario);
		UsuarioService.postUsuario(usuario).then(function(response){
			if(response.status == 201){
				var alertPopup = $ionicPopup.alert({
					title: 'Bem-vindo ao PagaEu',
					template: 'Usuário criado com sucesso!'
				});
				$rootScope.usuario = response.data;
			}else if(response.status == 409){
				var alertPopup = $ionicPopup.alert({
					title: 'Erro ao criar usuário',
					template: 'Já possui um usuário com esse email ou username!'
				});
			}
		});
		$state.go('login');
		$scope.hideLoading();
	}
}])