<template>
  <div id="burguer-table">
    <Message :msg="msg" v-show="msg" />

    <!-- Cabeçalho (somente desktop) -->
    <div id="burguer-table-heading" class="desktop-only">
      <div class="order-id">N°</div>
      <div>Clientes</div>
      <div>Pão</div>
      <div>Carne</div>
      <div>Opcionais</div>
      <div>Ações</div>
    </div>

    <!-- Linhas -->
    <div id="burguer-table-rows">
      <div
        class="burguer-table-row"
        v-for="burguer in burguers"
        :key="burguer.id"
      >
        <!-- Layout desktop -->
        <div class="desktop-only order-number">{{ burguer.id }}</div>
        <div class="desktop-only">{{ burguer.nome }}</div>
        <div class="desktop-only">{{ burguer.pao }}</div>
        <div class="desktop-only">{{ burguer.carne }}</div>
        <div class="desktop-only">
          <ul>
            <li v-for="(opcional, index) in burguer.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>

        <!-- Layout mobile -->
        <div class="mobile-card">
          <p><strong>N°:</strong> {{ burguer.id }}</p>
          <p><strong>Cliente:</strong> {{ burguer.nome }}</p>
          <p><strong>Pão:</strong> {{ burguer.pao }}</p>
          <p><strong>Carne:</strong> {{ burguer.carne }}</p>
          <p v-if="burguer.opcionais.length">
            <strong>Opcionais:</strong> {{ burguer.opcionais.join(", ") }}
          </p>
        </div>

        <!-- Ações -->
        <div class="actions">
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
</script>

<style scoped>
#burguer-table {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
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
  align-items: center;
}

#burguer-table-heading .order-id,
.burguer-table-row .order-number {
  width: 5%;
}

select {
  padding: 8px 6px;
  min-width: 120px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 8px 12px;
  min-width: 120px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Mobile cards */
.mobile-card {
  display: none;
  width: 100%;
  margin-bottom: 10px;
}

.mobile-card p {
  margin: 4px 0;
  font-size: 14px;
}

/* Responsividade */
@media (max-width: 768px) {
  /* .mobile-card {
    display: block;
  } */

  /* .burguer-table-row {
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
    background: #f9f9f9;
  } */

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }

  select,
  .delete-btn {
    flex: 1;
  }
}

@media (max-width: 480px) {
  ::v-deep(.desktop-only) {
    display: none !important;
  }

  .mobile-card {
    display: block;
  }

  .mobile-card p {
    width: 100%;
    font-size: 16px;
  }

  .burguer-table-row {
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 15px;
    background: #f9f9f9;
  }

  #burguer-table-heading div,
  .burguer-table-row div {
    width: 100%;
  }

  .delete-btn {
    margin-top: 0px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
