var token = null;

//REGEX
const regNoRegex=new RegExp('^1[0-9]{1}[A-Z]{3}[0-9]{4}$');
const phoneNoRegex=new RegExp('^[1-9]{1}[0-9]{9}$');

$(document).ready(function(){
  //SWITCH TO LOGIN
  $(".login_sam_btn").click(function(){
    $(".sam_signup").css("display","none");
    $(".raj_login").css("display","block");
  });

  //SIGNUP BUTTON
  $(".signup_btn_1").click(function(){

    var name = $("#name_su").val();
    var email_id = $("#emailid_su").val();
    var regno = $("#regno_su").val();
    var phone_num = $("#phone_no_su").val();
    var password = $("#password_su").val();
    var confpass = $("#confpassword_su").val();


    if(name!="" && email_id!="" && regNoRegex.test(regno)==true && phoneNoRegex.test(phone_num) && password.length>7 && password==confpass){
      var obj = { "name": name, "email": email_id, "regno": regno, "phone": phone_num, "password": password};
      var xhr=new XMLHttpRequest();
        console.log("0");
        xhr.open('POST','https://guarded-wave-16198.herokuapp.com/signup', false);
        console.log("1");
        xhr.setRequestHeader('Content-type', 'application/json');
        console.log(xhr.status);
        xhr.onreadystatechange = function() {//Call a function when the state changes.
        console.log(xhr.status);
            if(xhr.status == 200) {
                token = xhr.getResponseHeader('Authorization');
                console.log("2");
                $(".sam_signup").css("display","none");
                $(".raj_login").css("display","none");
                $(".3_sections_raj_satyam").css("display","block");
                xhr2=new XMLHttpRequest();
                xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/dashboard',false);
                xhr2.setRequestHeader('Content-type', 'application/json');
                xhr2.setRequestHeader('Authorization', token);
                console.log(token)
                xhr2.onreadystatechange = function(){
                    if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    if(xhr2.responseText.code=="TEAMCREATED"){
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                      console.log(xhr2.responseText.teamname, xhr2.responseText.name)
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.status=="TEAMJOINED"){
                      console.log("YOU ARE IN A TEAM OF 2");
                      console.log(xhr2.responseText.team, xhr2.responseText.creator, xhr2.responseText.member)
                    }
                  }
                }
                xhr2.send();
            }
            else if(xhr.status==404){
              console.log('ENTER ALLDETAILS')
            }
            else if(xhr.status==401){
              console.log('USER EXISTS')
            }
            else if(xhr.status==500){
              console.log("TRY AGAIN")
            }
        }
        xhr.send(JSON.stringify(obj));
    }
    else{
      console.log('ENTER ALL DETAILS')
    }
  });

    $(".logout_btn").click(function(){
      $(".3_sections_raj_satyam").css("display","none");
      $(".sam_signup").css("display","none");
      $(".raj_login").css("display","block");
      token=null;
    });

    $(".main_s11").css("display", "block");
    $(".dashboard_td").css("background-color", "#0D47A1");
    $(".dashboard_data").css("color","#FFFFFF");

  $(".main_login").click(function(){
    console.log(1);
    var email_id = $("#email_si").val();
    var password = $("#password_si").val();
    var obj = { "email": email_id, "password": password};
    if(password!="" && email_id!=""){
        var xhr=new XMLHttpRequest();
        xhr.open('POST','https://guarded-wave-16198.herokuapp.com/login', false);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function(){
          if(xhr.status == 200) {
            $(".raj_login").css("display","none");
            $(".3_sections_raj_satyam").css("display","block");
                token = xhr.getResponseHeader('Authorization');
                $(".raj_login").css("display","none");
                $(".3_sections_raj_satyam").css("display","block");
                xhr2=new XMLHttpRequest();
                xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/dashboard',false);
                xhr2.setRequestHeader('Content-type', 'application/json');
                xhr2.setRequestHeader('Authorization', token);
                xhr2.onreadystatechange = function(){
                  if(xhr2.status==400){
                    console.log('Enter all details');
                  } else if(xhr2.status==404){
                    console.log("TRY AGAIN");
                  } else if(xhr2.status==500){
                    console.log('TRY AGAIN');
                  } else if(xhr2.status==200){
                    console.log(xhr2.responseText);
                    if(xhr2.responseText.code=="TEAMCREATED"){
                      console.log(xhr2.responseText)
                      console.log("TEAM CREATED ONLY YOU ARE MMBER")
                    } else if(xhr2.responseText.code=="NOTEAMS"){
                      console.log("NO TEAM PRESENT")
                    } else if(xhr2.responseText.code=="TEAMJOINED"){
                      console.log("YOU ARE IN A TEAM OF 2");
                      console.log(xhr2.responseText)
                    }
                  }
                }
                xhr2.send();
              }
               else if(xhr.status==500){
                console.log("ERROR");
              } else if(xhr.status==404){
                console.log("INCORRECT COMBO");
              } else{
                console.log("TRY AGAIN")
              }
            }

            xhr.send(JSON.stringify(obj));
    }
    else{
      console.log("ENTER ALL DETAILS")
    }

  });


  $(".dashboard").click(function(){
    $(".create_team_td").css("background-color", "#FFFFFF");
    $(".create_team_data").css("color","#0D47A1");
    $(".invites_td").css("background-color", "#FFFFFF");
    $(".invites_data").css("color","#0D47A1");

    //ADDING
      $(".dashboard_td").css("background-color", "#0D47A1");
      $(".dashboard_data").css("color","#FFFFFF");

      $(".invites1").css("display","none");
      $(".main_s11").css("display", "block");
      $(".main_s2").css("display", "none");
      console.log(token)
      xhr2=new XMLHttpRequest();
      xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/dashboard',false);
      xhr2.setRequestHeader('Content-type', 'application/json');
      xhr2.setRequestHeader('Authorization', token);
      xhr2.onreadystatechange = function(){
        console.log(xhr2.status);
        if(xhr2.status==400){
        console.log('Enter all details');
      } else if(xhr2.status==404){
        console.log("TRY AGAIN");
      } else if(xhr2.status==500){
        console.log('TRY AGAIN');
      } else if(xhr2.status==200){
            var x=JSON.parse(xhr2.responseText)
            if(x.code=="TEAMCREATED"){
              console.log(x)
              console.log("TEAM CREATED ONLY YOU ARE MMBER");
            } else if(x.code=="NOTEAMS"){
              console.log("NO TEAM PRESENT");
            } else if(x.code=="TEAMJOINED"){
              console.log("YOU ARE IN A TEAM OF 2");
              console.log(x)
            }
      }
      }
      xhr2.send();
  });


  $(".create_team").click(function(){
    //REMOVAL
      $(".dashboard_td").css("background-color", "#FFFFFF");
      $(".dashboard_data").css("color","#0D47A1");
      $(".invites_td").css("background-color", "#FFFFFF");
      $(".invites_data").css("color","#0D47A1");
    //ADDING
      $(".create_team_td").css("background-color", "#0D47A1");
      $(".create_team_data").css("color","#FFFFFF");

      $(".invites1").css("display","none");
      $(".main_s11").css("display", "none");
      $(".main_s2").css("display", "block");
    });

    $("#submit_team").click(function(){
      var team_name = $(".team_name_new").val();
      console.log(team_name);
      if(team_name !=""){
        xhr2=new XMLHttpRequest();
            xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/addteam',false);
            xhr2.setRequestHeader('Content-type', 'application/json');
            xhr2.setRequestHeader('Authorization', token);
            xhr2.onreadystatechange = function(){
              console.log(xhr2.responseText);
              console.log(xhr2.status)
            if(xhr2.status==400){
              console.log('Enter all details');
            } else if(xhr2.status==404){
              console.log("TRY AGAIN");
            } else if(xhr2.status==500){
              console.log('TRY AGAIN');
            } else if(xhr2.status==200){
              x=JSON.parse(xhr2.responseText)
            if(x.code=="OK"){
              console.log("TEAM CREATED")
            } else if(x.code=="INATEAMORTEAMCREATED"){
              console.log("IN A TEAM OR TEAM CREATED")
            } else if(x.code=="TEAMNAMEEXIST"){
              console.log("TEAM NAME EXISTS")
            }
            }
            }
            xhr2.send(JSON.stringify({"teamname":team_name}));
        } else{
          console.log("ENTER TEAM NAME")
        }
      });


  $(".delete_team").click(function(){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/addteam',false);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==400){
      console.log('Enter all details');
    } else if(xhr2.status==401){
      console.log("TEAM FILLED");
    } else if(xhr2.status==500){
      console.log('TRY AGAIN');
    } else if(xhr2.status==200){
      console.log("DELETED")
    }
    }
    xhr2.send();
  });

  $(".invites").click(function(){
    $(".dashboard_td").css("background-color", "#FFFFFF");
    $(".dashboard_data").css("color","#0D47A1");
    $(".create_team_td").css("background-color", "#FFFFFF");
    $(".create_team_data").css("color","#0D47A1");

    //ADDING
    $(".invites_td").css("background-color", "#0D47A1");
    $(".invites_data").css("color","#FFFFFF");

    $(".main_s11").css("display", "none");
    $(".main_s2").css("display", "none");
    $(".invites1").css("display","block");
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/getavail',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==500){
      console.log('TRY AGAIN');
      return 0;
    } else if(xhr2.status==200){
      x=JSON.parse(xhr2.responseText)
      console.log(x.result)
      console.log(typeof x)
      for (var i = 0; i <=x.result.length; i++) {
          console.log(x.result[i].name);
           $(".appendable1").append(
             '<li class="collection-item"><div>' + x.result[i].name + '<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="middle"></a></div></li>');
           };
      console.log("FILL AVAILABLE")
    }
    }
    xhr2.send();
    xhr=new XMLHttpRequest();
    xhr.open("POST",'https://guarded-wave-16198.herokuapp.com/pending',true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', token);
    xhr.onreadystatechange = function(){
    if(xhr.status==500){
      console.log('TRY AGAIN');
    }else if(xhr.status==500){
      console.log('TRY AGAIN');
    }
    else if(xhr.status==200){
      x=JSON.parse(xhr.responseText)
      console.log(x);
      if(x.code=="TEAMJOINED"){
        console.log("TEAM JOINED CNT CHANGE")
      }
      else{
        console.log("FILL LIST")
        console.log(x.pending)
        console.log(x.sent)

            for(var i=0; i<x.sent.length; i++) {
                $(".appendable2").append(
                  '<li class="collection-item"><div>' + x.sent[i].name +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
                );
              };
          for(var i=0; i<x.pending.length; i++) {
            $(".appendable3").append(
              '<li class="collection-item" style="padding-bottom: none;"><div>' + x.pending[i].name + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span class="decline">Decline</span></a></div></div></li>');
          };
        }
      }
    }
    xhr.send();
  });

  function sendinvite(email){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/sendinvite',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==400){
      console.log('FILL EMAIL');
    } else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==404){
      console.log("CREATE TEAM")
    }
    else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==200){
      console.log("SENT")

        x=JSON.parse(xhr2.responseText)
        console.log(x.invites)
    }
  }
    xhr2.send(JSON.stringify({
      sendtoemail:email
    }));
  }

  function acceptinvite(teamname){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/sendinvite',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==400){
      console.log('FILL EMAIL');
    } else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==404){
      console.log("CREATE TEAM")
    }
    else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==200){

        x=JSON.parse(xhr2.responseText)

      if(x.code=="TEAMJOINED"){
        console.log("TEAM JOINED ALREADY")
      } else if(x.code=="OK"){
        console.log("ACCEPTED");
        //REDIRECT TO DASHBOARD AND CALL FOR TEAM AGAIN
      }
    }
  }
    xhr2.send(JSON.stringify({
      teamname:teamname
    }));
  }

  function rejectinvite(teamname){
    xhr2=new XMLHttpRequest();
    xhr2.open("POST",'https://guarded-wave-16198.herokuapp.com/sendinvite',true);
    xhr2.setRequestHeader('Content-type', 'application/json');
    xhr2.setRequestHeader('Authorization', token);
    xhr2.onreadystatechange = function(){
    if(xhr2.status==400){
      console.log('FILL TEAMNAME');
    } else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==500){
      console.log("ERROR")
    }
    else if(xhr2.status==200){
      console.log("DENIED")
      //remove form list
    }
  }
    xhr2.send(JSON.stringify({
      teamname:teamname
    }));
  }
});


  // console.log("hi");
        // var text = "Raj";
        // for (var i = 0; i <=10; i++) {
        //      $(".appendable1").append(
        //        '<li class="collection-item"><div>' + text + '<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-send-24px (1).svg" alt="Smiley face" align="middle"></a></div></li>');
        // };
  // console.log("kk");
  //
  //       for(var i=0; i<=10; i++) {
  //         $(".appendable2").append(
  //           '<li class="collection-item"><div>' + text +'<a href="#!" class="secondary-content"><img class="send_icon" src="images/baseline-remove_circle_outline-24px.svg" alt="Smiley face" align="middle"></a></div></li>'
  //         );
  //       };
  //   console.log("kk2");
  //
  //   for(var i=0; i<=10; i++) {
  //     $(".appendable3").append(
  //       '<li class="collection-item" style="padding-bottom: none;"><div>' + text + '</div><div class="row"><div class="col s6 l6"><a href="#!"><span class="accept">Accept</span></a></div><div class="col s6 l6"><a href="#!"><span class="decline">Decline</span></a></div></div></li>');
  //   };
