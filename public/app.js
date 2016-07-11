angular.module('MyApp', 
  ['ui.bootstrap', 'ngResource', 
  'ngMessages', 'ngAnimate','textAngular','ngSanitize',
  'angulartics','angulartics.google.analytics', 'ngFileUpload',
  'ngImgCrop', 'toastr', 'ui.router', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'partials/home.html'
      })
      .state('blogPost', {
        url: '/article/:id',
        controller: 'BlogPostCtrl',
        templateUrl: 'partials/blogpost.html'
      })
      .state('about', {
        url: '/about',
        controller: 'AboutCtrl',
        templateUrl: 'partials/about.html'
      })
      .state('categories', {
        url: '/category/:name',
        params: {
            id: null
        },
        templateUrl: 'partials/categories.html',
        controller: 'CategoryCtrl'
      })
      .state('archive', {
        url: '/archive/:year/:month',
        controller: 'ArchiveCtrl',
        templateUrl: 'partials/archive.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/admin/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'partials/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('editArticle',{
        url: '/admin/:id/edit',
        templateUrl: 'partials/admin/article-edit.html', 
        controller: 'ArticleEditCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('newArticle',{
        url: '/admin/new',
        templateUrl: 'partials/admin/article-add.html',
        controller: 'ArticleCreateCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('adminUsers',{
        url: '/admin/users',
        templateUrl: 'partials/admin/users.html',
        controller: 'AdminUserCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('adminCategory',{
        url: '/admin/categories',
        templateUrl: 'partials/admin/categories.html',
        controller: 'AdminCategoryCtrl',
        resolve: {
          loginRequired: loginRequired
        }
    }).state('adminStats', {
        url: '/admin/stats',
        templateUrl: 'partials/admin/stats.html',
        controller: 'AdminStatsCtrl',
        resolve: {
          loginRequired: loginRequired
        }
    }).state('profile', {
        url: '/admin/profile',
        templateUrl: 'partials/admin/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      });

    $urlRouterProvider.otherwise('/');

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  });
