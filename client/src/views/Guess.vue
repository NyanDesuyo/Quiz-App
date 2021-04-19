<template>
  <b-container fluid="md" class="text-center">
    <h1>Guess</h1>
    <h3>Question Number # {{ counter }} / {{ totalQuestion }}</h3>
    <h3>Score {{ (score / counter) * 100 }}</h3>
    <h2>{{ question }}</h2>
    <p>What the right answer?</p>
    <b-button variant="outline-info" @click="selectedAnswer(a)">{{
      a
    }}</b-button>
    <b-button variant="outline-info" @click="selectedAnswer(b)">{{
      b
    }}</b-button>
    <b-button variant="outline-info" @click="selectedAnswer(c)">{{
      c
    }}</b-button>

    <br />
    <br />

    <!--
    <h2>Debug</h2>
    <b-button @click="showModal()">Lauch Demo Modal</b-button>
    <b-button variant="outline-danger" @click="previous()">Previous</b-button>
    <b-button variant="outline-success" @click="next()">Next</b-button>
    -->

    <b-modal id="modal-1" hide-header hide-footer>
      <!--
        remember to inject later 
        no-close-on-esc no-close-on-backdrop 
      -->
      <div class="text-center">
        <h1>🎉Congratulation🎉</h1>
        <h3>Your final Score is {{ (score / totalQuestion) * 100 }}</h3>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Name:"
            label-for="input-1"
            description="You can use your real name or not, it's up to you."
          >
            <b-form-input
              id="input-1"
              v-model="form.name"
              type="text"
              placeholder="Enter your Name"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Guess",
  data() {
    return {
      id: "",
      number: 0,
      question: "",
      answer: "",
      a: "",
      b: "",
      c: "",
      counter: 1,
      totalQuestion: 0,
      score: 0,
      show: true,
      form: {
        name: "",
      },
    };
  },
  mounted: function() {
    this.loadQuestion();
    this.countQuestion();
  },
  methods: {
    // SYNC
    previous() {
      this.counter--;
      this.loadQuestion();
    },
    next() {
      this.counter++;
      this.loadQuestion();
    },
    selectedAnswer(param) {
      console.log("Question No: " + this.counter + " Answer " + param);
      if (this.answer === param) {
        console.log("✔ Correct");
        this.score++;
        if (this.counter !== this.totalQuestion) {
          this.next();
        } else {
          this.showModal();
        }
      } else {
        console.log("✖ Wrong");
        if (this.counter !== this.totalQuestion) {
          this.next();
        } else {
          this.showModal();
        }
      }
    },
    // MODAL
    showModal() {
      this.$bvModal.show("modal-1");
    },
    async onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form.name));
      alert(this.score);

      axios
        .post("http://localhost:3000/score", {
          name: this.form.name,
          score: (parseInt(this.score) / this.totalQuestion) * 100,
        })
        .then(() => {
          this.$router.push("/score");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    // ASYNC
    async loadQuestion() {
      const _counter = this.counter;
      axios
        .get(`http://localhost:3000/question/number/${_counter}`)
        .then((response) => {
          console.log(response);
          this.id = response.data.id;
          this.number = response.data.number;
          this.question = response.data.question;
          this.answer = response.data.answer;
          this.a = response.data.a;
          this.b = response.data.b;
          this.c = response.data.c;
        });
    },
    async countQuestion() {
      axios.get(`http://localhost:3000/question/`).then((response) => {
        const _total = response.data.results.length;
        console.log(`Length : ${_total}`);
        this.totalQuestion = _total;
      });
    },
  },
};
</script>

<style></style>
