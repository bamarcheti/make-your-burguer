<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burguer-form" @submit="createBurguer">
        <div class="input-container">
          <label for="nome">Nome do cliente: </label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite o seu nome"
            :class="{ 'input-error': nomeInvalido }"
          />
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão: </label>
          <select
            name="pao"
            id="pao"
            v-model="pao"
            :class="{ 'input-error': paoInvalido }"
          >
            <option value="">Selecione o seu pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <label for="carne">Escolha a carne do seu Burguer: </label>
          <select
            name="carne"
            id="carne"
            v-model="carne"
            :class="{ 'input-error': carneInvalido }"
          >
            <option value="">Selecione o tipo de carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }}
            </option>
          </select>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais"
            >Selecione os opcionais:
          </label>
          <div
            class="checkbox-container"
            v-for="opcional in opcionaisdata"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="opcionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }}</span>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burguer!" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api";
import Message from "./Message.vue";

export default {
  name: "BurguerForm",
  data() {
    return {
      paes: [],
      carnes: [],
      opcionaisdata: [],
      nome: "",
      pao: "",
      carne: "",
      opcionais: [],
      msg: null,
      submitted: false,
    };
  },
  methods: {
    async getIngredientes() {
      const [paesRes, carnesRes, opcionaisRes] = await Promise.all([
        api.get("/paes"),
        api.get("/carnes"),
        api.get("/opcionais"),
      ]);
      this.paes = paesRes.data;
      this.carnes = carnesRes.data;
      this.opcionaisdata = opcionaisRes.data;
    },

    async createBurguer(e) {
      e.preventDefault();
      this.submitted = true;

      if (!this.nome || !this.pao || !this.carne) {
        this.msg = "Preencha todos os campos obrigatórios!";
        setTimeout(() => (this.msg = ""), 3000);
        return;
      }

      const data = {
        nome: this.nome,
        carne: this.carne,
        pao: this.pao,
        opcionais: [...this.opcionais],
        status: "Solicitado",
      };

      const res = await api.post("/burguers", data);
      this.msg = `Pedido N° ${res.data.id} realizado com sucesso!`;
      setTimeout(() => (this.msg = ""), 3000);

      this.nome = "";
      this.carne = "";
      this.pao = "";
      this.opcionais = [];

      this.submitted = false;
    },
  },
  computed: {
    nomeInvalido() {
      return this.submitted && this.nome.trim() === "";
    },
    paoInvalido() {
      return this.submitted && this.pao === "";
    },
    carneInvalido() {
      return this.submitted && this.carne === "";
    },
  },
  mounted() {
    this.getIngredientes();
  },
  components: {
    Message,
  },
};
</script>

<style scoped>
#burguer-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-error {
  border: 2px solid red !important;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 100%;
  max-width: 300px;
}

#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
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

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}

@media (max-width: 768px) {
  input,
  select {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  #burguer-form {
    max-width: 100%;
    padding: 0 15px;
  }

  label {
    font-size: 14px;
  }

  .checkbox-container {
    width: 100%;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
