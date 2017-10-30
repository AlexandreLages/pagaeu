angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('UsuarioService', ['$http', function($http){
	URL_INSERIR_USUARIO = "http://localhost:8080/pagaeu/usuario/";
	URL_LISTAR_USUARIOS = "http://localhost:8080/pagaeu/usuario/lista";
	URL_PESQUISAR_USUARIO = "http://localhost:8080/pagaeu/usuario/login/";
	URL_DELETAR_USUARIO = "http://localhost:8080/pagaeu/usuario/deletar";

	return {
		getUsuario: function(login){
			return $http.get(URL_PESQUISAR_USUARIO + login.email + "/" + login.senha).then(function(response){
				usuariosData = response.data;
				return usuariosData;
			}).catch(function(response){
				return response;
			});
		},
		postUsuario: function(usuario){
			body = {
				nome: usuario.nome,
				email: usuario.email,
				username: usuario.username,
				telefone: usuario.telefone,
				senha: usuario.senha
			}

			return $http.post(URL_INSERIR_USUARIO, body).then(function(response){
				console.log("$http.post: ", response);
				return response;
			}).catch(function(response){
				console.log("$http.catch: ", response);
				return response;
			});
		}
	}
}])
.service('ContatoService', ['$http', function($http){
	URL_INSERIR_CONTATO = "http://localhost:8080/pagaeu/contato/";
	URL_LISTAR_CONTATOS = "http://localhost:8080/pagaeu/contato/lista/";
	URL_DELETAR_CONTATO = "http://localhost:8080/pagaeu/contato/";
	URL_EMPRESTAR = "http://localhost:8080/pagaeu/contato/emprestimo/";
	ULR_TRANSACOES = "http://localhost:8080/pagaeu/transacao/lista/";
	return {
		postContato: function(username, id){
			body = {
				username:username,
				id: id
			}
			return $http.post(URL_INSERIR_CONTATO, body).then(function(response){
				console.log("$http.post: ", response);
				return response;
			}).catch(function(response){
				console.log("$http.catch: ", response);
				return response;
			});
		},
		getContatos: function(id){
			return $http.get(URL_LISTAR_CONTATOS + id).then(function(response){
				contatosData = response.data;
				console.log("Contatos > ", response.data);
				return contatosData;
			}).catch(function(response){
				return response;
			});	
		},
		deleteContato: function(contato){
			return $http.delete(URL_DELETAR_CONTATO + contato.id).then(function(response){
	        	console.log("$http.delete: ", URL_DELETAR_CONTATO + contato.id, response);
				return response;
			}).catch(function(response){
				console.log("$http.catch: ", response);
				return response;
			});
		},
		getContato: function(id){
			return $http.get(URL_INSERIR_CONTATO + id).then(function(response){
				console.log("$http.get: ", URL_DELETAR_CONTATO + id, response);
				contatoData = response.data;
				return contatoData;
			}).catch(function(response){
				return response;
			});		
		},
		postEmprestimo: function(valor, idContato, idUsuario){
			body = {
				valor: valor,
				idContato: idContato,
				idUsuario: idUsuario
			}
			return $http.post(URL_EMPRESTAR, body).then(function(response){
				console.log("$http.post: ", response);
				return response;
			}).catch(function(response){
				console.log("$hhtp.catch: ", response);
				return response;
			});
		},
		getTransacoes: function(idUsuario, idContato){
			return $http.get(ULR_TRANSACOES + idUsuario + "/" + idContato).then(function(response){
				transacoesData = response.data;
				console.log("Transacoes > ", response.data);
				return transacoesData;
			}).catch(function(response){
				return response;
			});	
		}
	}
}]);