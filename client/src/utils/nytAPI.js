import axios from 'axios';

export default {
    retrieveArticles: function (q, startYear, endYear) {

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        return axios({
            method: 'GET',
            url: url,
            params: {
                'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
                'q': q,
                'begin_date': startYear+"0101",
                'end_date': endYear+"1231"
            }
        })
            .then(function (response) {
                console.log(response.data.response.docs);
                return response.data.response.docs;
            });
    }
}