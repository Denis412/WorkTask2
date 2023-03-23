import{c as T,V as L,ap as U,X as R,aq as x,s as d,d as c,h as i,ar as j,T as D,A as F,g as E,f as z,w as K,j as M,as as P,at as O,a4 as B}from"./index.e4f63a73.js";var Z=T({name:"QItem",props:{...L,...U,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:l,emit:r}){const{proxy:{$q:g}}=E(),m=R(e,g),{hasLink:n,linkAttrs:h,linkClass:u,linkTag:s,navigateOnClick:v}=x(),o=d(null),y=d(null),S=c(()=>e.clickable===!0||n.value===!0||e.tag==="label"),f=c(()=>e.disable!==!0&&S.value===!0),$=c(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(m.value===!0?" q-item--dark":"")+(n.value===!0&&e.active===null?u.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(f.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),b=c(()=>{if(e.insetLevel===void 0)return null;const a=g.lang.rtl===!0?"Right":"Left";return{["padding"+a]:16+e.insetLevel*56+"px"}});function q(a){f.value===!0&&(y.value!==null&&(a.qKeyEvent!==!0&&document.activeElement===o.value?y.value.focus():document.activeElement===y.value&&o.value.focus()),v(a))}function _(a){if(f.value===!0&&j(a,13)===!0){D(a),a.qKeyEvent=!0;const k=new MouseEvent("click",a);k.qKeyEvent=!0,o.value.dispatchEvent(k)}r("keyup",a)}function I(){const a=F(l.default,[]);return f.value===!0&&a.unshift(i("div",{class:"q-focus-helper",tabindex:-1,ref:y})),a}return()=>{const a={ref:o,class:$.value,style:b.value,role:"listitem",onClick:q,onKeyup:_};return f.value===!0?(a.tabindex=e.tabindex||"0",Object.assign(a,h.value)):S.value===!0&&(a["aria-disabled"]="true"),i(s.value,a,I())}}});const H=()=>window.Clerk.user,V=()=>{window.Clerk.openSignIn()},W=()=>{window.Clerk.openSignUp()},p={get:H,login:V,registration:W};var ee=T({name:"QList",props:{...L,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:l}){const r=E(),g=R(e,r.proxy.$q),m=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(g.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>i(e.tag,{class:m.value},z(l.default))}});const X={ratio:[String,Number]};function G(e,l){return c(()=>{const r=Number(e.ratio||(l!==void 0?l.value:void 0));return isNaN(r)!==!0&&r>0?{paddingBottom:`${100/r}%`}:null})}const J=16/9;var te=T({name:"QImg",props:{...X,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:J},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:l,emit:r}){const g=d(e.initialRatio),m=G(e,g);let n=null,h=!1;const u=[d(null),d(q())],s=d(0),v=d(!1),o=d(!1),y=c(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),S=c(()=>({width:e.width,height:e.height})),f=c(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),$=c(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));K(()=>b(),_);function b(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function q(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function _(t){n!==null&&(clearTimeout(n),n=null),o.value=!1,t===null?(v.value=!1,u[s.value^1].value=q()):v.value=!0,u[s.value].value=t}function I({target:t}){h!==!0&&(n!==null&&(clearTimeout(n),n=null),g.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,a(t,1))}function a(t,C){h===!0||C===1e3||(t.complete===!0?k(t):n=setTimeout(()=>{n=null,a(t,C+1)},50))}function k(t){h!==!0&&(s.value=s.value^1,u[s.value].value=null,v.value=!1,o.value=!1,r("load",t.currentSrc||t.src))}function A(t){n!==null&&(clearTimeout(n),n=null),v.value=!1,o.value=!0,u[s.value].value=null,u[s.value^1].value=q(),r("error",t)}function N(t){const C=u[t].value,w={key:"img_"+t,class:f.value,style:$.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...C};return s.value===t?(w.class+=" q-img__image--waiting",Object.assign(w,{onLoad:I,onError:A})):w.class+=" q-img__image--loaded",i("div",{class:"q-img__container absolute-full",key:"img"+t},i("img",w))}function Q(){return v.value!==!0?i("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},z(l[o.value===!0?"error":"default"])):i("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},l.loading!==void 0?l.loading():e.noSpinner===!0?void 0:[i(O,{color:e.spinnerColor,size:e.spinnerSize})])}return _(b()),M(()=>{h=!0,n!==null&&(clearTimeout(n),n=null)}),()=>{const t=[];return m.value!==null&&t.push(i("div",{key:"filler",style:m.value})),o.value!==!0&&(u[0].value!==null&&t.push(N(0)),u[1].value!==null&&t.push(N(1))),t.push(i(P,{name:"q-transition--fade"},Q)),i("div",{class:y.value,style:S.value,role:"img","aria-label":e.alt},t)}}});const ae=B`
  query getAllChatsForCurrentUser($user_id: String!) {
    chats(
      where: {
        _or: [
          { consumer_id: { _eq: $user_id } }
          { sender_id: { _eq: $user_id } }
        ]
      }
    ) {
      sender_id
      consumer_id
      id
      consumer_firstName
      consumer_avatar
      sender_firstName
      sender_avatar
    }
  }
`;B`
  query getUsers {
    users {
      id
      first_name
      email
      avatar_url
    }
  }
`;B`
  query getUserById($id: String) {
    users(where: { id: { _eq: $id } }) {
      first_name
      email
    }
  }
`;const ne=B`
  query getSavedMessagesInThisChat($chat_id: Int) {
    messages(where: { chat_id: { _eq: $chat_id } }) {
      id
      senderId
      senderDisplayName
      senderAvatarUrl
      created_at
      content
      consumerId
    }
  }
`;export{Z as Q,te as a,ee as b,ne as c,ae as g,p as u};
