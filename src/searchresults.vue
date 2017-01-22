<template lang="jade">
  f7-page#searchPage(data-page='searchPage')
    f7-navbar(back-link='Back', sliding='', title='Search results')
    f7-list.search-results(media-list='')
      f7-list-item(v-on:click='onClick(tweet)', link='/tweet/', v-for='tweet in searchResults', :media='tweet | imgFilter', :title='tweet | userFilter', :subtitle='tweet | screenNameFilter', :text='tweet.text')
</template>

<script>
import store from './store.js';
import filters from './filters.js'

export default {
  name: 'searchResults',
  data () {
    return {
      searchResults: store.searchResults
    }
  },
  filters: filters,
  methods: {
    onClick (tweet) {
      store.selectedTweet = tweet;
    }
  }
}
</script>

<style lang="sass?indentedSyntax">
  .tweet
    .card-content
      padding: 15px;
</style>
