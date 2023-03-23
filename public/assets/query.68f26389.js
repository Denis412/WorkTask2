import{c as I,V as L,ao as D,X as R,ap as M,s as v,d,h as u,aq as U,T as j,A as x,g as E,f as Q,w as F,j as K,ar as H,as as P,i as O,at as V,a4 as $}from"./index.b4acd880.js";var ee=I({name:"QItem",props:{...L,...D,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:l,emit:i}){const{proxy:{$q:r}}=E(),g=R(e,r),{hasLink:n,linkAttrs:h,linkClass:s,linkTag:o,navigateOnClick:f}=M(),c=v(null),y=v(null),S=d(()=>e.clickable===!0||n.value===!0||e.tag==="label"),m=d(()=>e.disable!==!0&&S.value===!0),B=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(g.value===!0?" q-item--dark":"")+(n.value===!0&&e.active===null?s.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(m.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),b=d(()=>{if(e.insetLevel===void 0)return null;const a=r.lang.rtl===!0?"Right":"Left";return{["padding"+a]:16+e.insetLevel*56+"px"}});function q(a){m.value===!0&&(y.value!==null&&(a.qKeyEvent!==!0&&document.activeElement===c.value?y.value.focus():document.activeElement===y.value&&c.value.focus()),f(a))}function _(a){if(m.value===!0&&U(a,13)===!0){j(a),a.qKeyEvent=!0;const k=new MouseEvent("click",a);k.qKeyEvent=!0,c.value.dispatchEvent(k)}i("keyup",a)}function T(){const a=x(l.default,[]);return m.value===!0&&a.unshift(u("div",{class:"q-focus-helper",tabindex:-1,ref:y})),a}return()=>{const a={ref:c,class:B.value,style:b.value,role:"listitem",onClick:q,onKeyup:_};return m.value===!0?(a.tabindex=e.tabindex||"0",Object.assign(a,h.value)):S.value===!0&&(a["aria-disabled"]="true"),u(o.value,a,T())}}});const W=()=>window.Clerk.user,X=()=>{window.Clerk.openSignIn()},G=()=>{window.Clerk.openSignUp()},te={get:W,login:X,registration:G};var ae=I({name:"QList",props:{...L,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:l}){const i=E(),r=R(e,i.proxy.$q),g=d(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(r.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>u(e.tag,{class:g.value},Q(l.default))}});const J={ratio:[String,Number]};function Y(e,l){return d(()=>{const i=Number(e.ratio||(l!==void 0?l.value:void 0));return isNaN(i)!==!0&&i>0?{paddingBottom:`${100/i}%`}:null})}const Z=16/9;var ne=I({name:"QImg",props:{...J,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:Z},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:l,emit:i}){const r=v(e.initialRatio),g=Y(e,r);let n=null,h=!1;const s=[v(null),v(q())],o=v(0),f=v(!1),c=v(!1),y=d(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),S=d(()=>({width:e.width,height:e.height})),m=d(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),B=d(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));F(()=>b(),_);function b(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function q(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function _(t){n!==null&&(clearTimeout(n),n=null),c.value=!1,t===null?(f.value=!1,s[o.value^1].value=q()):f.value=!0,s[o.value].value=t}function T({target:t}){h!==!0&&(n!==null&&(clearTimeout(n),n=null),r.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,a(t,1))}function a(t,C){h===!0||C===1e3||(t.complete===!0?k(t):n=setTimeout(()=>{n=null,a(t,C+1)},50))}function k(t){h!==!0&&(o.value=o.value^1,s[o.value].value=null,f.value=!1,c.value=!1,i("load",t.currentSrc||t.src))}function z(t){n!==null&&(clearTimeout(n),n=null),f.value=!1,c.value=!0,s[o.value].value=null,s[o.value^1].value=q(),i("error",t)}function N(t){const C=s[t].value,w={key:"img_"+t,class:m.value,style:B.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...C};return o.value===t?(w.class+=" q-img__image--waiting",Object.assign(w,{onLoad:T,onError:z})):w.class+=" q-img__image--loaded",u("div",{class:"q-img__container absolute-full",key:"img"+t},u("img",w))}function A(){return f.value!==!0?u("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},Q(l[c.value===!0?"error":"default"])):u("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},l.loading!==void 0?l.loading():e.noSpinner===!0?void 0:[u(P,{color:e.spinnerColor,size:e.spinnerSize})])}return _(b()),K(()=>{h=!0,n!==null&&(clearTimeout(n),n=null)}),()=>{const t=[];return g.value!==null&&t.push(u("div",{key:"filler",style:g.value})),c.value!==!0&&(s[0].value!==null&&t.push(N(0)),s[1].value!==null&&t.push(N(1))),t.push(u(H,{name:"q-transition--fade"},A)),u("div",{class:y.value,style:S.value,role:"img","aria-label":e.alt},t)}}});const ie=e=>{const l=new Date(e),i=l.getHours(),r=l.getMinutes(),g=i>9?i:`0${i}`,n=r>9?r:`0${r}`;return`${g}:${n}`};function le(){return O(V)}const re=$`
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
`;$`
  query getUsers {
    users {
      id
      first_name
      email
      avatar_url
    }
  }
`;$`
  query getUserById($id: String) {
    users(where: { id: { _eq: $id } }) {
      first_name
      email
    }
  }
`;const ue=$`
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
`;export{ee as Q,ne as a,ae as b,ie as c,le as d,ue as e,re as g,te as u};
