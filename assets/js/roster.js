var apiKey = "0a11942f318647978979f13ad8aa53ee",
    a8GroupId = "1801684";
var roster = [];
var profiledata = {};
var twitch = new Object;
twitch["The_Jedd"] = "the_j3dd";
twitch["ssmashi"] = "supersmashi";
twitch["rLycan_"] = "rlycan_";
twitch["Fryde"] = "fry_de";
twitch["iWhackEpic"] = "ihackepic";
twitch["Aileyus"] = "alias616";
twitch["dazzah87"] = "dazzah87";
twitch["Deecs259"] = "deecs259";
twitch["ricdvs"] = "ric_dvs";
twitch["Intemerata_"] = "intemerata_";
twitch["Dannilad"] = "dannilad09";
twitch["X_White-_-Ninja_"] = "xz_white_ninja_zx";
twitch["Disrupticz"] = "disrupticz";
$.when($.ajax({
    url: "https://www.bungie.net/platform/GroupV2/" + a8GroupId + "/Members/",
    headers: {
        "X-API-Key": apiKey
    }
}).done(function(json) {
    if (json.ErrorStatus === "Success") {
        var members = json.Response.results;
        $.each(members, function(i) {
            roster.push(members[i]);
            getProfileData(members[i].destinyUserInfo.membershipId, i)
        })
    } else console.log("JSON responded with ", json.ErrorStatus)
}).fail(function(err) {
    console.log(err)
})).then(function() {});
$(document).ajaxStop(function() {
    listMembers(roster)
});

function getProfileData(memberid, index) {
    $.ajax({
        url: "https://www.bungie.net/Platform/Destiny2/2/Profile/" + memberid + "/?components=200",
        headers: {
            "X-API-KEY": apiKey
        },
        method: "GET"
    }).done(function(data) {
        roster[index]["toons"] = [];
        var z = 0;
        $.each(data.Response.characters.data, function(j) {
            roster[index]["toons"]["char" + z] = data.Response.characters.data[j];
            z++
        })
    });
    return
}

function listMembers(rsp) {
    var list = $(".roster-table tbody"),
        on = 0,
        sortMembers = function(method) {
            if (method == joined) list.find(".member").sort(function(a, b) {
                return $(b).data("joined") < $(a).data("joined") ? 1 : -1
            }).appendTo(list);
            else if (method == username) list.find(".member").sort(function(a, b) {
                return $(b).data("username") < $(a).data("username") ? 1 : -1
            }).appendTo(list);
            list.find(".member.online").prependTo(list)
        };
    for (var i = 0; i < rsp.length; i++) {
        var profile = rsp[i].bungieNetUserInfo,
            member = $("<tr></tr>");
        if (rsp[i].isOnline) on++;
        if (typeof profile != "undefined") {
            var classTypes = {
                0: "Titan",
                1: "Hunter",
                2: "Warlock"
            };
            var name = rsp[i].destinyUserInfo.displayName,
                joinDate = rsp[i].joinDate,
                joined = joinDate.substring(0, joinDate.indexOf("T")),
                online = rsp[i].isOnline;
            icon = profile.emblemPath, memberId = profile.membershipId, memberType = rsp[i].memberType, destinyId = rsp[i].destinyUserInfo.membershipId, toon0 = {
                "id": rsp[i].toons.char0.characterId,
                "emblem": "https://bungie.net/" + rsp[i].toons.char0.emblemPath,
                "light": rsp[i].toons.char0.light,
                "class": classTypes[rsp[i].toons.char0.classType]
            };
            toon1 = {
                "id": rsp[i].toons.char1.characterId,
                "emblem": "https://bungie.net/" + rsp[i].toons.char1.emblemPath,
                "light": rsp[i].toons.char1.light,
                "class": classTypes[rsp[i].toons.char1.classType]
            };
            toon2 = {
                "id": rsp[i].toons.char2.characterId,
                "emblem": "https://bungie.net/" + rsp[i].toons.char2.emblemPath,
                "light": rsp[i].toons.char2.light,
                "class": classTypes[rsp[i].toons.char2.classType]
            };
            rank = rsp[i].memberType, role = "";
            if (rank == 2) role = '<font color="#FFFFFF">' + "Member" + " </font>";
            else if (rank == 3) role = '<font color="#F1C410">' +
                "Admin" + " </font>";
            else if (rank == 5) role = '<font color="#F1C410">' + "Founder" + " </font>";
            member.attr({
                "class": "text-left member",
                "href": "/player.html?bungieId=" + memberId + "&destinyId=" + destinyId + "&joined=" + joined + "&rank=" + rank,
                "data-joined": joined.replace(/-/g, ""),
                "data-username": name,
                "data-online": "false",
                "data-searchable": name
            }).html('<td class="align-middle">' + name + "</td>" + '<td class="align-middle">' + role + "</td>" + '<td class="align-middle">' + joined.replace(/-/g, "/") + "</td>" + '<td class="align-middle member-status"><span class="member-online" id="status-' +
                memberId + '">' + online + "</span></td>" + '<td class="align-middle"><div class="d-flex justify-content-center"> <div class="d-flex flex-column justify-content-center">' + '<a href="https://www.bungie.net/en/Gear/2/' + destinyId + "/" + toon0.id + '" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(' + toon0.emblem +
                ');"> <div class="light text-white font-weight-bold">' + toon0.light + '</div><div class="level text-white">' + toon0["class"] + '</div></div></a> </div><div class="d-flex flex-column justify-content-center"> ' + '<a href="https://www.bungie.net/en/Gear/2/' + destinyId + "/" + toon1.id + '" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(' +
                toon1.emblem + ');"> <div class="light text-white font-weight-bold">' + toon1.light + '</div><div class="level text-white">' + toon1["class"] + '</div></div></a> </div><div class="d-flex flex-column justify-content-center">' + '<a href="https://www.bungie.net/en/Gear/2/' + destinyId + "/" + toon2.id + '" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(' +
                toon2.emblem + ');"> <div class="light text-white font-weight-bold">' + toon2.light + '</div><div class="level text-white">' + toon2["class"] + "</div></div></a> </div></div></td>" + '<td class="align-middle text-center">' + (!twitch[name] ? "" : '<a target="_blank" href="https://twitch.tv/' + twitch[name] + '"><i class="fab fa-twitch fa-lg" style="color:white"></i></a>') + "</td>" + '<td class="align-middle text-center">' + ('<a target="_blank" href="https://www.wastedondestiny.com/2_' + destinyId + '"><i class="far fa-clock fa-lg" style="color:white"></i></a>') +
                "</td>" + '<td class="align-middle text-center"><a target="_blank" href="https://destinytracker.com/destiny-2/profile/psn/' + name + '/overview">Stats</a></td>' + '<td class="align-middle text-center"><a target="_blank" href="https://raid.report/ps/' + name + '">Clears</a></td>');
            member.appendTo(list);
            if (String(online) === "true") $("#status-" + memberId).text("Online").addClass("online").closest(".member").attr("data-online", true).addClass("online");
            else $("#status-" + memberId).text("Offline").removeClass("online");
            sortMembers(joined)
        }
    }
    $("#member-count").text(on +
        " / " + rsp.length + " Online")
};