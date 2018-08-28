var apiKey = "0a11942f318647978979f13ad8aa53ee", // production
a8GroupId = "1801684";


// get list of members and populate roster table

var roster = [];

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
        online = rsp[i].isOnline ? 'Online' : '', // If online show 'Online', if not show nothing
        icon = profile.iconPath,
        memberId = profile.membershipId,
        memberType = rsp[i].memberType,
        destinyId = rsp[i].destinyUserInfo.membershipId,
        rank = rsp[i].memberType,
        role= '';

      if (rank == 2) {
        role = "Member";
      } else if(rank == 3) {
        role = "Admin";
      } else if( rank == 5 ) {
        role = "Owner"
      }

			// configure DOM node and add to page
      member
        .attr({
          'class': 'j-row vertical-center-row member',
          'href': '/player.html?bungieId=' + memberId + '&destinyId=' + destinyId + '&joined=' + joined + '&rank=' + rank,
          'title': 'See player profile for ' + name,
          'data-joined' : joined.replace(/-/g, ''),
          'data-username': name,
          'data-online' : 'false',
          'data-searchable' : name,
        })
        .html(
            '<th scope="row"><img src="https://www.bungie.net' + icon + '" style="width: 30px; height:30px"></th>' + // avatar
            '<td class="align-middle">' + name + '</td>' + // Username
            '<td class="text-warning align-middle">' + role + '</td>' + // Role - Not the discord role yet
            '<td class="align-middle">' + joined.replace(/-/g, '/') + '</td>' + // Joined
            '<td class="align-middle">' + online + '</td>' + // In game online status
            '<td class="align-middle"><a target="_blank" href="https://destinytracker.com/d2/profile/psn/' + name + '">View Stats</a></td>' + // DTR Profile
            '<td class="align-middle"><a target="_blank" href="https://raid.report/ps/' + name + '">View Clears</a></td>' + // RR Profile 
            '<td class="align-middle"><a target="_blank" href="https://www.bungie.net/en/Profile/254/' + memberId + '/' + name + '">View Profile</a></td>' // Bungie Profile 
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