<template lang="jade">
  div#app
    f7-login-screen#loginScreen
      f7-view
        f7-pages
          f7-page.loginscreen(login-screen='')
            f7-login-screen-title Twitvue
            img.twitlogo(src="gfx/twitter.png")
            f7-list
              f7-list-button(title='Sign In', v-on:click="onSignIn")
              f7-list-label
                p We kindly ask you to sign<br>in to your Twitter account
    f7-views(navbar-through='')
      f7-view#mainView(main='', url='/')
        f7-pages#pages
          f7-page.navbar-fixed
            f7-navbar(title='Twitvue')
              f7-nav-right
                f7-link.f7-icons.open-picker(data-picker='.picker-new-tweet') compose
            f7-searchbar(cancel-link='Cancel', placeholder='Search tweets', :clear='true', v-on:change="onChange")
            f7-list.tweets(media-list='')
              f7-list-item(v-on:click='onClick(tweet)', link='/tweet/', v-for='tweet in tweets', :media='tweet | imgFilter', :title='tweet | userFilter', :subtitle='tweet | screenNameFilter', :text='tweet.text')
    f7-picker-modal.picker-new-tweet
      f7-toolbar
        f7-link.close-picker(data-picker='.picker-new-tweet') Cancel
        f7-link(v-on:click="sendTweet") Post
      .new-tweet-content
        f7-list(form='')
          f7-list-item
            f7-input(type='textarea', placeholder='New tweet', v-model='newTweet') {{newTweet}}
</template>

<script>
import twitter from './twitter.js';
import store from './store.js';
import filters from './filters.js';

let self;

export default {
  name: 'app',
  data () {
    return {
      tweets : store.tweets,
      newTweet : ''
    }
  },
  created () {
    self = this;
  },
  filters : filters,
  methods : {
    onChange (event) {
      let term = event.target.value;
      if (term && term.length > 0) {
        window.f7.showPreloader();
        twitter.cb.__call(
            "search_tweets",
            "q=" + term,
            function (reply) {
                let result = reply.statuses;
                store.searchResults.splice(0, self.$data.tweets.length);
                store.searchResults.push(...result);

                var mainView = Dom7('#mainView')[0].f7View;
                mainView.router.load({url: '/search/'});
                window.f7.hidePreloader();
            },
            true
        );
      }
    },
    onClick (tweet) {
      store.selectedTweet = tweet;
    },
    onSignIn () {
      window.f7.showPreloader();
      twitter.login();
    },
    sendTweet () {
      let tweetText = this.newTweet;
      if (tweetText && tweetText.length > 0) {
        window.f7.showPreloader();
        twitter.cb.__call(
            "statuses_update",
            {"status": tweetText},
            function (reply, rate, err) {
                window.f7.hidePreloader();
                if (err) {
                  alert("Could not send tweet");
                }
                else {
                  window.f7.closeModal('.picker-new-tweet');
                }
            }
        );
      }
      else {
        alert("You have to enter text")
      }
    }
  }
}
</script>

<style lang="sass?indentedSyntax">
  .tweets
    .item-media
      img
        border-radius: 100%;
        
  .loginscreen
    text-align: center
    .twitlogo
      width: 70px
</style>
