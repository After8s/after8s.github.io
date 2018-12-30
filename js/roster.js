var apiKey = "0a11942f318647978979f13ad8aa53ee", // production
    a8GroupId = "1801684";


// get list of members and populate roster table

var roster = [];

var twitch = new Object();
twitch['The_Jedd']         = 'the_j3dd';
twitch['smashi__']         = 'supersmashi';
twitch['ArctisFear']       = 'arctisfear';
twitch['Intemerata_']      = 'intemerata_';
twitch['ronobear87']       = 'ronobear87';
twitch['Fryde']            = 'fry_de';
twitch['iHackEpic']        = 'ihackepic';
twitch['Hushspesh']        = 'hushspesh101';
twitch['LyRaD87cP']        = 'dazzah87';
twitch['Vortex4950']       = 'vortex4950';
twitch['Mini-B0rg40']      = 'terrybjsr27';
twitch['Deecs259']         = 'deecs259';
twitch['CristianoRicky16'] = 'ricdvs';
twitch['Puntmannetje']     = 'puntmannetje';
twitch['murdie1']          = 'gabbercrew';
twitch['LiamRS24']		   = 'liamrs24';
twitch['ctrcmo1029']       = 'ctrcmo1029';
twitch['Dannilad09']       = 'dannilad';
twitch['Smokebelch109']    = 'smokebelch109';
twitch['PrOyKaEnR91']      = 'proykaenr';
twitch['RubberBandLazer']  = 'gaienos';


$.when(
        // get A8 roster
        $.ajax({
            url: "https://www.bungie.net/platform/GroupV2/" + a8GroupId + "/Members/",
            headers: {
                "X-API-Key": apiKey
            }
        })

        .done(function(json) {

            if (json.ErrorStatus === 'Success') {

                var members = json.Response.results;

                $.each(members, function(i) {
                    roster.push(members[i])
                });

                console.log('a8s member list:', members);

            } else {

                console.log('JSON responded with ', json.ErrorStatus);

            }

        })
        .fail(function(err) {

            console.log(err);

        })

    )
    .then(function() {
        console.log(roster);
        listMembers(roster);

    });


function listMembers(rsp) {

    var
        list = $('.roster-table tbody'),
        on = 0,
        sortMembers = function(method) {
            // sort by date joined
            if (method == joined) {
                list.find('.member').sort(function(a, b) {
                    return ($(b).data('joined')) < ($(a).data('joined')) ? 1 : -1;
                }).appendTo(list);
            } else if (method == username) {
                list.find('.member').sort(function(a, b) {
                    return ($(b).data('username')) < ($(a).data('username')) ? 1 : -1;
                }).appendTo(list);
            }
            list.find('.member.online').prependTo(list);
        };

    for (var i = 0; i < rsp.length; i++) {

        var
            profile = rsp[i].bungieNetUserInfo,
            member = $('<tr></tr>');

        // tally up online members
        if (rsp[i].isOnline) {
            on++
        }

        // check for valid profile
        // some users don't have Bungie profiles somehow and it breaks function
        if (typeof profile != 'undefined') {
            // store response data in semantic variables
            var
                name = rsp[i].destinyUserInfo.displayName,
                joinDate = rsp[i].joinDate,
                joined = joinDate.substring(0, joinDate.indexOf('T')),
                online = rsp[i].isOnline
                icon = profile.iconPath,
                memberId = profile.membershipId,
                memberType = rsp[i].memberType,
                destinyId = rsp[i].destinyUserInfo.membershipId,
                rank = rsp[i].memberType,
                role = '';

            if (rank == 2) {
                role = "Member";
            } else if (rank == 3) {
                role = "Admin";
            } else if (rank == 5) {
                role = "Founder"
            }

            // configure DOM node and add to page
            member
                .attr({
                    'class': 'text-left member',
                    'href': '/player.html?bungieId=' + memberId + '&destinyId=' + destinyId + '&joined=' + joined + '&rank=' + rank,
                    'title': 'See player profile for ' + name,
                    'data-joined': joined.replace(/-/g, ''),
                    'data-username': name,
                    'data-online': 'false',
                    'data-searchable': name,
                })
                .html(
                    '<th scope="row"><img src="https://www.bungie.net' + icon + '" style="width: 30px; height:30px"></th>' + // Avatar
                    '<td class="align-middle">' + name + '</td>' + // PSN username
                    '<td class="align-middle text-warning">' + role + '</td>' + // Role - Not the Discord role yet
                    '<td class="align-middle">' + joined.replace(/-/g, '/') + '</td>' + // Joined date
                    '<td class="align-middle member-status"><span class="member-online" id="status-' + memberId + '">' + online + '</span></td>' + // In game online status
                    '<td class="align-middle text-center">'+((!twitch[name]) ? '' : '<a target="_blank" href="https://twitch.tv/' + twitch[name] +'"><img src="img/twitch_icon.png" style="width: 20px; height:20px"></a>')+'</td>' +  // Twitch - yes, show icon | no, show nothing
                    '<td class="align-middle text-center">'+('<a target="_blank" href="https://www.wastedondestiny.com/2_' + destinyId +'"><img src="img/clock.png" width="30" height="30"></a>')+'</td>' + // Wasted Time
                    '<td class="align-middle text-center"><a target="_blank" href="https://destinytracker.com/d2/profile/psn/' + name + '">View Stats</a></td>' + // DTR Profile
                    '<td class="align-middle text-center"><a target="_blank" href="https://raid.report/ps/' + name + '">View Clears</a></td>' + // Raid Report Profile 
                    '<td class="align-middle text-center"><a target="_blank" href="https://www.bungie.net/en/Profile/254/' + memberId + '/' + name + '">View Profile</a></td>' // Bungie Profile
                );

            member.appendTo(list);

            // indicate online/offline status
            if (String(online) === 'true') {
                $('#status-' + memberId)
                    .text('Online')
                    .addClass('online')
                    .closest('.member')
                    .attr('data-online', true)
                    .addClass('online');
            } else {
                $('#status-' + memberId).text('Offline').removeClass('online');
            }

            sortMembers(joined); // sort members by join date

        }

    }

    $('#member-count').text(on + ' / ' + rsp.length + ' Members Online');

}
