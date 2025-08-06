<template>
  <div id="burguer-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burguer-table-heading">
        <div class="order-id">#:</div>
        <div>Clientes:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burguer-table-rows">
      <div
        class="burguer-table-row"
        v-for="burguer in burguers"
        :key="burguer.id"
      >
        <div class="order-number">{{ burguer.id }}</div>
        <div>{{ burguer.nome }}</div>
        <div>{{ burguer.pao }}</div>
        <div>{{ burguer.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burguer.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select
            name="status"
            class="status"
            @change="updateBurguer($event, burguer.id)"
          >
            <option value="">Selecione</option>
            <option
              v-for="s in status"
              :key="s.id"
              :value="s.tipo"
              :selected="burguer.status == s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurguer(burguer.id)">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Message from "./Message.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      burguers: [],
      status: [],
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getPedidos() {
      const { data } = await api.get("/burguers");
      this.burguers = data;
      this.getStatus();
    },
    async getStatus() {
      const { data } = await api.get("/status");
      this.status = data;
    },
    async deleteBurguer(id) {
      await api.delete(`/burguers/${id}`);
      this.msg = `Pedido removido com sucesso!`;
      setTimeout(() => (this.msg = ""), 3000);
      this.getPedidos();
    },
    async updateBurguer(event, id) {
      const option = event.target.value;
      const { data } = await api.patch(`/burguers/${id}`, { status: option });
      this.msg = `O pedido N° ${data.id} foi atualizado para ${data.status}`;
      setTimeout(() => (this.msg = ""), 3000);
    },
  },
  mounted() {
    this.getPedidos();
  },
};

// import Message from './Message.vue';

// export default {
//     name: "Dashboard",
//     data() {
//         return {
//             burguers: null,
//             burguer_id: null,
//             status: [],
//             msg: null
//         }
//     },
//     components: {
//         Message
//     },
//     methods: {
//         async getPedidos() {
//             const req = await fetch("http://localhost:3000/burguers");
//             const data = await req.json();
//             this.burguers = data;
//             console.log(this.burguers);
//             // resgatar os status
//             this.getStatus();
//         },
//         async getStatus() {
//             const req = await fetch("http://localhost:3000/status");
//             const data = await req.json();
//             this.status = data;
//         },
//         async deleteBurguer(id) {
//             const req = await fetch(`http://localhost:3000/burguers/${id}`, {
//                 method: "DELETE"
//             });
//             const res = await req.json();

//             // colocar uma mensagem no sistema
//             this.msg = `Pedido removido com sucesso!`;

//             // limpar mensagem
//             setTimeout(() => this.msg = "", 3000);

//             this.getPedidos();
//         },
//         async updateBurguer(event, id) {
//             const option = event.target.value;
//             const dataJson = JSON.stringify({ status: option });
//             const req = await fetch(`http://localhost:3000/burguers/${id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: dataJson
//             });
//             const res = await req.json();

//             // colocar uma mensagem no sistema
//             this.msg = `O pedido N° ${res.id} foi atualizado para ${res.status}`;

//             // limpar mensagem
//             setTimeout(() => this.msg = "", 3000);

//             console.log(res);
//         },
//     },
//     mounted() {
//         this.getPedidos();
//     },
// }
</script>

<style scoped>
#burguer-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burguer-table-heading,
#burguer-table-rows,
.burguer-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burguer-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burguer-table-heading div,
.burguer-table-row div {
  width: 19%;
}

.burguer-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burguer-table-heading .order-id,
.burguer-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
