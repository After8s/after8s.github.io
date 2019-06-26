    var bungieAPIkey="0a11942f318647978979f13ad8aa53ee";
    var clanid="1801684";
    var clan= {};
        clan.members= {};
        clan.retryCounter= {};
    var aquiredvalues=[0, 8, 16, 64, 80];
    var nightfalldata= {
    "invertedspire": {
        "activityid":4259769141,
        "thisweek":false,
        "itemid":[1718922261],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "pyramidion": {
        "activityid":3289589202,
        "thisweek":false,
        "itemid":[1152758802],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "exoduscrash": {
        "activityid":1282886582,
        "thisweek":false,
        "itemid":[3036030067],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "armsdealer": {
        "activityid":3145298904,
        "thisweek":false,
        "itemid":[3036030066],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "savathunssong": {
        "activityid":3280234344,
        "thisweek":false,
        "itemid":[1333654061],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "treeprobabilities": {
        "activityid":3718330161,
        "thisweek":false,
        "itemid":[1279318110],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "gardenworld": {
        "activityid":936308438,
        "thisweek":false,
        "itemid":[2448009818],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "willofthousands": {
        "activityid":272852450,
        "thisweek":false,
        "itemid":[2466440635],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "strangeterrain": {
        "activityid":522318687,
        "thisweek":false,
        "itemid":[1534387877],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "lakeofshadows": {
        "activityid":3372160277,
        "thisweek":false,
        "itemid":[1602518767],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "insightterminus": {
        "activityid":1034003646,
        "thisweek":false,
        "itemid":[1186314105],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "corrupted": {
        "activityid":3034843176,
        "thisweek":false,
        "itemid":[1099984904],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "hollowedlair": {
        "activityid":3701132453,
        "thisweek":false,
        "itemid":[1074861258],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "wardenofnothing": {
        "activityid":3108813009,
        "thisweek":false,
        "itemid":[1279318101],
        "location":"profile",
        "members":[],
        "membercompletions": {}
    },
    "ascendantchallenge": {
        "activityid":0,
        "thisweek":true,
        "itemid":[3360537487],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "dcweeklystory": {
        "activityid":0,
        "thisweek":true,
        "itemid":[1469913807],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "shatteredthrone": {
        "activityid":0,
        "thisweek":false,
        "itemid":[3163873689],
        "location":"character",
        "members":[],
        "membercompletions": {}
    },
    "gambitcosmetics": {
        "activityid":0,
        "thisweek":true,
        "itemid":[1469913806,
        3163873691],
        "location":"character",
        "members":[],
        "membercompletions": {}
    }
};
var nfIdName= {
    4259769141: "invertedspire", 3289589202: "pyramidion", 1282886582: "exoduscrash", 3145298904: "armsdealer", 3280234344: "savathunssong", 3718330161: "treeprobabilities", 936308438: "gardenworld", 272852450: "willofthousands", 522318687: "strangeterrain", 3372160277: "lakeofshadows", 1034003646: "insightterminus", 3034843176: "corrupted", 3701132453: "hollowedlair", 3108813009: "wardenofnothing", 2032534090: "shatteredthrone", 1893059148: "shatteredthrone", 1640956655: "dcweeklystory", 3746811765: "dcweeklystory", 1313738982: "dcweeklystory"
};
$(document).ready(function() {
    $("#currentnfs").click(function() {
        $("#currentnfs").addClass("SectionList--itemActive");
        $("#allnfs").removeClass("SectionList--itemActive");
        $(".nfblock").not(".thisWeekActive").hide()
    }
    );
    $("#allnfs").click(function() {
        $("#allnfs").addClass("SectionList--itemActive");
        $("#currentnfs").removeClass("SectionList--itemActive");
        $(".nfblock").show()
    }
    );
    $.each(nightfalldata, function(nfname, nfdata) {
        if(nfdata.thisweek===true)$("#"+nfname).parent().parent().addClass("thisWeekActive")
    }
    );
    markThisWeeksActivities();
    $.ajax( {
        url:"https://www.bungie.net/Platform/GroupV2/"+clanid+"/Members/", headers: {
            "X-API-KEY": bungieAPIkey
        }, method:"GET"
    }
    ).done(function(data) {
        if(!data.Response) {
            $("body").html("API down?");
            return
        }
        $.each(data.Response.results, function(index, value) {
            clan.retryCounter[value.destinyUserInfo.membershipId]=0;
            clan.members[value.destinyUserInfo.membershipId]=value.destinyUserInfo.displayName;
            checkForLoot(value.destinyUserInfo.membershipId);
            getCharacterHistories(value.destinyUserInfo.membershipId)
        }
        )
    }
    )
}

);
$(document).ajaxStop(function() {
    outputLootData(nightfalldata);
    console.log("loot data done")
}

);
function checkForLoot(memberid) {
    $.ajax( {
        url:"https://www.bungie.net/Platform/Destiny2/2/Profile/"+memberid+"/?components=800", headers: {
            "X-API-KEY": bungieAPIkey
        }, method:"GET"
    }
    ).done(function(data) {
        if(data.ErrorCode>1||!data.Response||typeof data.Response.profileCollectibles.data==="undefined") {
            clan.retryCounter[memberid]++;
            if(clan.retryCounter[memberid]>2)return;
            checkForLoot(memberid)
        }
        else {
            $.each(nightfalldata, function(nfname, nfdata) {
                $.each(nfdata.itemid, function(itemindex, itemidtocheck) {
                    if(nfdata.location==="character")$.each(data.Response.characterCollectibles.data, function(charindex, charvalue) {
                        var itemstate=typeof charvalue.collectibles[itemidtocheck]==="undefined"?-1: charvalue.collectibles[itemidtocheck].state;
                        if(jQuery.inArray(itemstate, aquiredvalues)===-1&&jQuery.inArray(clan.members[memberid], nightfalldata[nfname]["members"])===-1)nightfalldata[nfname]["members"].push(clan.members[memberid]);
                        return false
                    }
                    );
                    else {
                        var itemstate=typeof data.Response.profileCollectibles.data.collectibles[itemidtocheck]==="undefined"?-1: data.Response.profileCollectibles.data.collectibles[itemidtocheck].state;
                        if(jQuery.inArray(itemstate, aquiredvalues)===-1&&jQuery.inArray(clan.members[memberid], nightfalldata[nfname]["members"])===-1)nightfalldata[nfname]["members"].push(clan.members[memberid])
                    }
                }
                )
            }
            );
            outputLootData(nightfalldata)
        }
    }
    );
    return
}

function outputLootData(nfobject) {
    $.each(nightfalldata, function(nfname, nfdata) {
        var nameswithcounter=[];
        $.each(nfdata["members"], function(mindex, mname) {
            if(typeof nfdata["membercompletions"][mname]!=="undefined")nameswithcounter.push(mname+" ("+nfdata["membercompletions"][mname]+")");
            else nameswithcounter.push(mname)
        }
        );
        $("#"+nfname).html(nameswithcounter.sort().join(", "))
    }
    );
    return
}

function markThisWeeksActivities() {
    $.ajax( {
        url:"https://www.bungie.net/Platform/Destiny2/Milestones/", headers: {
            "X-API-KEY": bungieAPIkey
        }, method:"GET"
    }
    ).done(function(data) {
        $.each(data.Response[2171429505].activities, function(activityindex, activitydata) {
            $.each(nightfalldata, function(nfname, nfdata) {
                if(activitydata.activityHash==nfdata.activityid) {
                    nightfalldata[nfname].thisweek=true;
                    $("#"+nfname).parent().parent().addClass("thisWeekActive");
                    return false
                }
            }
            )
        }
        )
    }
    );
    var resetTime="17:00:00Z";
    var cycleInfo= {
        epoch: {
            ascendant: (new Date("2018-09-04T"+resetTime)).getTime(), curse: (new Date("2018-09-11T"+resetTime)).getTime(), ep: (new Date("2018-05-08T"+resetTime)).getTime()
        },
        cycle: {
            ascendant: 6, curse: 3, ep: 5
        },
        elapsed: {},
        week: {}
    };
    var time=(new Date).getTime();
    var msPerWk=6048E5;
    for(var cycle in cycleInfo.cycle) {
        cycleInfo.elapsed[cycle]=time-cycleInfo.epoch[cycle];
        cycleInfo.week[cycle]=Math.floor(cycleInfo.elapsed[cycle]/msPerWk%cycleInfo.cycle[cycle])+1
    }
    if(cycleInfo.week.curse===3) {
        nightfalldata["shatteredthrone"].thisweek=true;
        $("#shatteredthrone").parent().parent().addClass("thisWeekActive")
    }
    return
}

function getCharacterHistories(memberid) {
    var cids=[];
    $.ajax( {
        url:"https://www.bungie.net/Platform/Destiny2/2/Profile/"+memberid+"/?components=100", headers: {
            "X-API-KEY": bungieAPIkey
        }, method:"GET"
    }
    ).done(function(data) {
        $.each(data.Response.profile.data.characterIds, function(cindex, currentcharacterid) {
            $.ajax( {
                url:"https://www.bungie.net/Platform/Destiny2/2/Account/"+memberid+"/Character/"+currentcharacterid+"/Stats/AggregateActivityStats/", headers: {
                    "X-API-KEY": bungieAPIkey
                }, method:"GET"
            }
            ).done(function(data2) {
                $.each(data2.Response.activities, function(aindex, activitydata) {
                    if(typeof nfIdName[activitydata.activityHash]!=="undefined")if(typeof nightfalldata[nfIdName[activitydata.activityHash]]["membercompletions"][clan.members[memberid]]==="undefined")nightfalldata[nfIdName[activitydata.activityHash]]["membercompletions"][clan.members[memberid]]=activitydata.values.activityCompletions.basic.value;
                    else nightfalldata[nfIdName[activitydata.activityHash]]["membercompletions"][clan.members[memberid]]+=activitydata.values.activityCompletions.basic.value
                }
                )
            }
            )
        }
        )
    }
    );
    return
};