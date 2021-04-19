<template>
  <b-container fluid="md" class="py-5 text-center">
    <h1>Question Data</h1>
    <p class="lead">Create, Edit & Delete</p>

    <b-container>
      <b-table :items="question" :fields="fields"> </b-table>
    </b-container>

    <b-container class="text-center">
      <b-button variant="primary">
        Create
      </b-button>
      <b-button variant="warning">
        Update
      </b-button>
      <b-button variant="danger">
        Delete
      </b-button>
    </b-container>

    <!--Edit Modal-->
    <b-modal id="modal-multi-1"> </b-modal>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Question",
  data() {
    return {
      question: [],
      //test
      fields: [
        {
          key: "number",
          sortable: false,
        },
        {
          key: "id",
          sortable: false,
        },
        {
          key: "question",
          sortable: false,
        },
        {
          key: "answer",
          sortable: false,
        },
        {
          key: "a",
          sortable: false,
        },
        {
          key: "b",
          sortable: false,
        },
        {
          key: "c",
          sortable: false,
        },
      ],
    };
  },
  mounted: function() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
      axios
        .get(`http://localhost:3000/question`)
        .then((response) => {
          this.question = response.data.results;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
