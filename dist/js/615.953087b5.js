"use strict";(self["webpackChunkxxx"]=self["webpackChunkxxx"]||[]).push([[615],{6615:function(t,s,a){a.r(s),a.d(s,{default:function(){return y}});a(7658);var e=a(3396),n=a(9242),o=a(7139),r=a(4870),l=a(1120);const i=t=>((0,e.dD)("data-v-504b7f1a"),t=t(),(0,e.Cn)(),t),u={id:"wrapper"},d={class:"loginbox container mt-5"},c={class:"mb-3",style:{"text-align":"center"}},p={class:"group mb-2"},m=i((()=>(0,e._)("label",{for:"inputEmail",class:"sr-only"},"Name",-1))),b={class:"group mb-2"},v=i((()=>(0,e._)("label",{for:"inputPassword",class:"sr-only"},"Password",-1))),f={class:"text-end btn-group mt-4"},g={class:"btn btn-lg btn-block",type:"submit",disabled:""};var w={__name:"Login",setup(t){const s=(0,e.f3)("$swal"),a=(0,r.iH)(null),i="http://34.80.185.163/shumingyu/login",w=(0,r.qj)({Name:"",Password:""});function _(){a.value=!0,$axios({method:"post",url:i,headers:{"Content-Type":"multipart/form-data"},data:w}).then((t=>{a.value=!1,l.Z.push("/dashboard/products")})).catch((t=>{a.value=!1,s({icon:"error",title:t.response.data.errmsg})}))}return(t,s)=>{const r=(0,e.up)("Loading");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e.Wm)(r,{active:a.value},null,8,["active"]),(0,e._)("div",u,[(0,e._)("div",d,[(0,e._)("form",{class:"form",onSubmit:s[2]||(s[2]=(0,n.iM)(((...s)=>t.register&&t.register(...s)),["prevent"]))},[(0,e._)("h2",c,(0,o.zw)(t.$t("BackendSystem")),1),(0,e._)("div",p,[m,(0,e.wy)((0,e._)("input",{type:"text",id:"inputEmail",class:"form-control",required:"",autofocus:"","onUpdate:modelValue":s[0]||(s[0]=t=>w.Name=t)},null,512),[[n.nr,w.Name,void 0,{trim:!0}]])]),(0,e._)("div",b,[v,(0,e.wy)((0,e._)("input",{type:"password",id:"inputPassword",class:"form-control",required:"","onUpdate:modelValue":s[1]||(s[1]=t=>w.Password=t)},null,512),[[n.nr,w.Password,void 0,{trim:!0}]])]),(0,e._)("div",f,[(0,e._)("button",{class:"btn btn-lg btn-block",type:"submit",onClick:_},(0,o.zw)(t.$t("Login")),1),(0,e._)("button",g,(0,o.zw)(t.$t("Register")),1)])],32)])])],64)}}},_=a(89);const h=(0,_.Z)(w,[["__scopeId","data-v-504b7f1a"]]);var y=h}}]);
//# sourceMappingURL=615.953087b5.js.map