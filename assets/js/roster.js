var apiKey="0a11942f318647978979f13ad8aa53ee",a8GroupId="1801684",roster=[],profiledata={},twitch=new Object;function getProfileData(e,t){$.ajax({url:"https://www.bungie.net/Platform/Destiny2/2/Profile/"+e+"/?components=200",headers:{"X-API-KEY":apiKey},method:"GET"}).done(function(e){roster[t].toons=[];var a=0;$.each(e.Response.characters.data,function(n){roster[t].toons["char"+a]=e.Response.characters.data[n],a++})})}function listMembers(e){for(var t,a=$(".roster-table tbody"),n=0,r=0;r<e.length;r++){var s=e[r].bungieNetUserInfo,i=$("<tr></tr>");if(e[r].isOnline&&n++,void 0!==s){var o={0:"Titan",1:"Hunter",2:"Warlock"},l=e[r].destinyUserInfo.displayName,d=e[r].joinDate,c=d.substring(0,d.indexOf("T")),h=e[r].isOnline;icon=s.emblemPath,memberId=s.membershipId,memberType=e[r].memberType,destinyId=e[r].destinyUserInfo.membershipId,toon0={id:e[r].toons.char0.characterId,emblem:"https://bungie.net/"+e[r].toons.char0.emblemPath,light:e[r].toons.char0.light,class:o[e[r].toons.char0.classType]},toon1={id:e[r].toons.char1.characterId,emblem:"https://bungie.net/"+e[r].toons.char1.emblemPath,light:e[r].toons.char1.light,class:o[e[r].toons.char1.classType]},toon2={id:e[r].toons.char2.characterId,emblem:"https://bungie.net/"+e[r].toons.char2.emblemPath,light:e[r].toons.char2.light,class:o[e[r].toons.char2.classType]},rank=e[r].memberType,role="",2==rank?role='<font color="#FFFFFF">Member </font>':3==rank?role='<font color="#F1C410">Admin </font>':5==rank&&(role='<font color="#F1C410">Founder </font>'),i.attr({class:"text-left member",href:"/player.html?bungieId="+memberId+"&destinyId="+destinyId+"&joined="+c+"&rank="+rank,"data-joined":c.replace(/-/g,""),"data-username":l,"data-online":"false","data-searchable":l}).html('<td class="align-middle">'+l+'</td><td class="align-middle">'+role+'</td><td class="align-middle">'+c.replace(/-/g,"/")+'</td><td class="align-middle member-status"><span class="member-online" id="status-'+memberId+'">'+h+'</span></td><td class="align-middle"><div class="d-flex justify-content-center"> <div class="d-flex flex-column justify-content-center"><a href="https://www.bungie.net/en/Gear/2/'+destinyId+"/"+toon0.id+'" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('+toon0.emblem+');"> <div class="light text-white font-weight-bold">'+toon0.light+'</div><div class="level text-white">'+toon0.class+'</div></div></a> </div><div class="d-flex flex-column justify-content-center"> <a href="https://www.bungie.net/en/Gear/2/'+destinyId+"/"+toon1.id+'" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('+toon1.emblem+');"> <div class="light text-white font-weight-bold">'+toon1.light+'</div><div class="level text-white">'+toon1.class+'</div></div></a> </div><div class="d-flex flex-column justify-content-center"><a href="https://www.bungie.net/en/Gear/2/'+destinyId+"/"+toon2.id+'" target="_blank" class="text-decoration-none border border-2 border-success ml-1 mr-2"> <div class="character d-flex flex-column justify-content-center align-items-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('+toon2.emblem+');"> <div class="light text-white font-weight-bold">'+toon2.light+'</div><div class="level text-white">'+toon2.class+'</div></div></a> </div></div></td><td class="align-middle text-center">'+(twitch[l]?'<a target="_blank" href="https://twitch.tv/'+twitch[l]+'"><i class="fab fa-twitch fa-lg" style="color:white"></i></a>':"")+'</td><td class="align-middle text-center"><a target="_blank" href="https://www.wastedondestiny.com/2_'+destinyId+'"><i class="far fa-clock fa-lg" style="color:white"></i></a></td><td class="align-middle text-center"><a target="_blank" href="https://destinytracker.com/d2/profile/psn/'+l+'">Stats</a></td><td class="align-middle text-center"><a target="_blank" href="https://raid.report/ps/'+l+'">Clears</a></td>'),i.appendTo(a),"true"===String(h)?$("#status-"+memberId).text("Online").addClass("online").closest(".member").attr("data-online",!0).addClass("online"):$("#status-"+memberId).text("Offline").removeClass("online"),(t=c)==c?a.find(".member").sort(function(e,t){return $(t).data("joined")<$(e).data("joined")?1:-1}).appendTo(a):t==username&&a.find(".member").sort(function(e,t){return $(t).data("username")<$(e).data("username")?1:-1}).appendTo(a),a.find(".member.online").prependTo(a)}}$("#member-count").text(n+" / "+e.length+" Online")}twitch.The_Jedd="the_j3dd",twitch.smashi__="supersmashi",twitch.ArctisFear="arctisfear",twitch["Savagely-Gentle"]="intemerata_",twitch.rLycan_="rlycan_",twitch.Fryde="fry_de",twitch.iWhackEpic="ihackepic",twitch.Aliashush="hushspesh101",twitch.dazzah87="dazzah87",twitch["TezzaBear-JSR40"]="terrybjsr27",twitch.Deecs259="deecs259",twitch.ricdvs="cristianoricky1",twitch.MurdieX="gabbercrew",twitch.Dannilad="dannilad",twitch.Gonasm="andimgonex",twitch["PrOme-"]="prome84",$.when($.ajax({url:"https://www.bungie.net/platform/GroupV2/"+a8GroupId+"/Members/",headers:{"X-API-Key":apiKey}}).done(function(e){if("Success"===e.ErrorStatus){var t=e.Response.results;$.each(t,function(e){roster.push(t[e]),getProfileData(t[e].destinyUserInfo.membershipId,e)})}else console.log("JSON responded with ",e.ErrorStatus)}).fail(function(e){console.log(e)})).then(function(){}),$(document).ajaxStop(function(){listMembers(roster)});