<template>
  <b-container fluid="md" class="text-center">
    <h1>Score</h1>
    <b-table :items="score" :fields="fields"></b-table>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Score",
  data() {
    return {
      fields: [
        {
          key: "name",
          sortable: false,
        },
        {
          key: "score",
          sortable: true,
        },
        {
          key: "date",
          sortable: true,
        },
      ],
      score: [],
    };
  },
  mounted: function() {
    this.loadScore();
  },
  methods: {
    loadScore() {
      axios.get(`http://localhost:3000/score`).then((response) => {
        console.log(response);
        this.score = response.data.results;
      });
    },
  },
};
</script>

<style></style>
