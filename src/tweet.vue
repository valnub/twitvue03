<template lang="jade">
  f7-page(hide-bars-on-scroll='')
    f7-navbar(back-link='Back', sliding='')
    .card.facebook-card.tweet
      .card-header.no-border
        .facebook-avatar
          img(:src='tweet | imgUrlFilter', width='34', height='34')
        .facebook-name {{tweet | userFilter}}
        .facebook-date {{tweet | dateFilter}}
      .card-content
        {{tweet.text}}
        img(v-if="tweet.entities.media", :src='tweet.entities.media[0].media_url', width='100%')
      .card-footer.no-border
        a.link(href='#') Reply
        a.link(href='#') Retweet
        a.link(href='#') Like

</template>

<script>
import store from './store.js';
import filters from './filters.js'

export default {
  name: 'tweet',
  data () {
    return {
      tweet: store.selectedTweet
    }
  },
  filters: filters
}
</script>

<style lang="sass?indentedSyntax">
  .tweet
    .card-content
      padding: 15px;
</style>
