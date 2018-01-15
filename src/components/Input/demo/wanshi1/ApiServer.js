import React, { Component } from 'react';
import { ajax } from 'api/ajax';


const serveUrl = {
  getIcon:'/hgSet/getHonourIcons',
  addIcon:'/hgSet/createHonourIcon'
}

const localUrl = {
  getIcon:'/api/customedhonor/getIcon.json',
  addIcon:'/api/customedhonor/addIcon.json'
}


//获取icon列表
export function GetIcon(param, callback) {
  ajax({
    "type": "get",
    "url": serveUrl.getIcon,
    "param": param,
  }, function(response) {
    if (callback instanceof Function) {
      callback(response);
    }
  });
}

//添加荣耀
export function AddIcon(param, callback) {
  ajax({
    "type": "post",
    "url": serveUrl.addIcon,
    "param": param,
    "contentType": "application/json"
  }, function(response) {
    if (callback instanceof Function) {
      callback(response);
    }
  });
}
