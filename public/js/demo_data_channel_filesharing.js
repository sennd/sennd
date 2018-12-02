//
//Copyright (c) 2016, Skedans Systems, Inc.
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without
//modification, are permitted provided that the following conditions are met:
//
//    * Redistributions of source code must retain the above copyright notice,
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright
//      notice, this list of conditions and the following disclaimer in the
//      documentation and/or other materials provided with the distribution.
//
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
//AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
//IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
//ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
//LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
//CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
//SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
//INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
//CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
//ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//POSSIBILITY OF SUCH DAMAGE.
//

console.log(document.location.href.split('/')[3].split('-')[1])

var selfEasyrtcid = document.location.href.split('/')[3].split('-')[1];
var peers = {};

// function buildPeerBlockName(easyrtcid) {
//     return "peerzone_" + easyrtcid;
// }

// function buildDragNDropName(easyrtcid) {
//     return "dragndrop_" + easyrtcid;
// }

// function buildReceiveAreaName(easyrtcid) {
//     return "receivearea_" + easyrtcid;
// }


function connect() {
    // var otherClientsDiv = document.getElementById('otherClients');
    console.log(easyrtc.getConnectStatus(selfEasyrtcid))
    easyrtc.enableDataChannels(true);
    easyrtc.enableVideo(false);
    easyrtc.enableAudio(false);
    easyrtc.setRoomOccupantListener();

    easyrtc.setDataChannelOpenListener(function(easyrtcid, usesPeer) {
        // var obj = document.getElementById(buildDragNDropName(easyrtcid));
        // if (!obj) {
        //     console.log("no such object ");
        // }
        // jQuery(obj).addClass("connected");
        // jQuery(obj).removeClass("notConnected");
    });

    easyrtc.setDataChannelCloseListener(function(easyrtcid) {
        // jQuery(buildDragNDropName(easyrtcid)).addClass("notConnected");
        // jQuery(buildDragNDropName(easyrtcid)).removeClass("connected");
    });

    console.log("connect", easyrtc.connect("easyrtc.dataFileTransfer", loginSuccess, loginFailure))

    //easyrtc.connect("easyrtc.dataFileTransfer", loginSuccess, loginFailure);

    easyrtc.call(selfEasyrtcid,
        function(caller, mediatype) {
            console.log('asd')
        },
        function(errorCode, errorText) {
            console.log('qwe')
            noDCs[selfEasyrtcid] = true;
        },
        function wasAccepted(yup) {
        }
    );
    console.log(easyrtc.getConnectStatus(selfEasyrtcid))
}


function acceptRejectCB(wasAccepted) {
  wasAccepted(true);
}

function receiveStatusCB(otherGuy, msg) {
  console.log("msg", msg);
  return true;
}

function blobAcceptor(otherGuy, blob, filename) {
  console.log("otherGuy", otherGuy);
  easyrtc_ft.saveAs(blob, filename);
}

function loginSuccess(easyrtcid) {
  selfEasyrtcid = easyrtcid;
  console.log("selfEasyrtcid", selfEasyrtcid);
  easyrtc_ft.buildFileReceiver(acceptRejectCB, blobAcceptor, receiveStatusCB);
}

function loginFailure(errorCode, message) {
  console.log("error", error)
  easyrtc.showError(errorCode, message);
}
