// 1) Abra a conexão (você já fez isso) e espere o onsuccess
var connection = indexedDB.open("drawDB");

connection.onsuccess = function(event) {
  var db = event.target.result;

  // 2) Cria transação readwrite
  var tx = db.transaction("diagrams", "readwrite");
  var store = tx.objectStore("diagrams");

  // 3) Busca o objeto com id = 2
  var getReq = store.get(1);
  getReq.onsuccess = function() {
    var obj = getReq.result;
    if (!obj) {
      console.error("Registro não encontrado!");
      return;
    }

    // 4) Modifica o campo database
    obj.database = "sqlite";

    // 5) Grava de volta com put (atualiza o mesmo registro)
    var updateReq = store.put(obj);
    updateReq.onsuccess = function() {
      console.log("Campo 'database' atualizado com sucesso!");
    };
    updateReq.onerror = function(e) {
      console.error("Erro ao atualizar:", e.target.error);
    };
  };
  getReq.onerror = function(e) {
    console.error("Falha ao ler o registro:", e.target.error);
  };

  // opcional: tx.oncomplete / tx.onerror para monitorar a transação
  tx.oncomplete = function() {
    console.log("Transação concluída.");
  };
  tx.onerror = function(e) {
    console.error("Erro na transação:", e.target.error);
  };
};