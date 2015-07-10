'use strict';


module.exports = function(m) {
    m.factory('utilService', ['$resource',
        function() {

            var totalOfferMailCard = function(card) {
                var total = 0;
                for (var i = 0; i < card.length; i = i + 1) {

                    // console.log('totalOfferMailCard', card[i]);
                    total += card[i].gogo_buy * card[i].value * card[i].amount / 100;
                }

                return total;
            };

            var totalOfferOnline = function(card) {
                var total = 0;
                for (var i = 0; i < card.length; i = i + 1) {
                    total += card[i].gogo_buy * card[i].value * card[i].amount / 100;
                }

                return (total > 5) ? (total - 5) : 0;
            };

            var totalFaceValue = function(cards) {
                var total = 0;
                for (var i = 0; i < cards.length; i = i + 1) {
                    total += cards[i].value;
                }

                return total;
            };

            var titleCase = function(str) {
                return str.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };

            var averagePayout = function(cards) {
                var total = 0;
                for (var i = 0; i < cards.length; i = i + 1) {
                    total += cards[i].gogo_buy;
                }

                return total / cards.length;
            };

            return {
                totalOfferMailCard: totalOfferMailCard,
                totalOfferOnline: totalOfferOnline,
                titleCase: titleCase,
                totalFaceValue: totalFaceValue,
                averagePayout: averagePayout
            };
        }
    ]);
};