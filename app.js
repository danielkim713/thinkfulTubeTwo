var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      part: 'snippet',
      q: searchTerm,
      order: 'viewCount',
      type: 'video',
      key: 'AIzaSyBGFsCfNhZimEgA4WqO_heLMT9TzIDjGOE'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  console.log($.ajax(settings));
}


function displayYouTubeSearchData(data) {
  var resultElement = '';
  var imageURL = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += '<p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src=' + item.snippet.thumbnails.default.url + '></a><br>' + item.snippet.title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(function(){watchSubmit();});