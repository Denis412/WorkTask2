import{aH as b,c as B,V as N,aI as x,X as R,aJ as z,r as v,d,h as r,ae as A,T as Q,A as F,g as M,f as U,w as H,k as j,ay as K,ax as P}from"./index.8f0ae387.js";b`
  subscription getCurrentIdCalls($user_id: String!) {
    calls(
      where: {
        _or: [
          { consumer_id: { _eq: $user_id } }
          { sender_id: { _eq: $user_id } }
        ]
      }
    ) {
      id
    }
  }
`;const X=b`
  subscription getUsers($id: String!) {
    users(where: { id: { _eq: $id } }) {
      id
      first_name
      email
      avatar_url
      last_seen
    }
  }
`,G=b`
  subscription getUsers {
    users {
      id
      first_name
      email
      avatar_url
      last_seen
    }
  }
`,Y=b`
  subscription getAllChatsForCurrentUser($user_id: String!) {
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
      call_id
    }
  }
`,Z=b`
  subscription getLastMessageInTheChat($chat_id: Int) {
    chats(where: { id: { _eq: $chat_id } }) {
      messages(order_by: { created_at: desc }, limit: 1) {
        id
        senderId
        senderDisplayName
        senderAvatarUrl
        created_at
        content
        consumerId
        chat_id
      }
    }
  }
`,p=b`
  subscription getSavedMessagesInThisChat($chat_id: Int) {
    chats(where: { id: { _eq: $chat_id } }) {
      messages(order_by: { created_at: asc }) {
        id
        senderId
        senderDisplayName
        senderAvatarUrl
        created_at
        content
        consumerId
      }
      call_id
    }
  }
`;var ee=B({name:"QItem",props:{...N,...x,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:l,emit:n}){const{proxy:{$q:s}}=M(),g=R(e,s),{hasLink:i,linkAttrs:h,linkClass:u,linkTag:o,navigateOnClick:f}=z(),c=v(null),_=v(null),S=d(()=>e.clickable===!0||i.value===!0||e.tag==="label"),m=d(()=>e.disable!==!0&&S.value===!0),w=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(g.value===!0?" q-item--dark":"")+(i.value===!0&&e.active===null?u.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(m.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),q=d(()=>{if(e.insetLevel===void 0)return null;const a=s.lang.rtl===!0?"Right":"Left";return{["padding"+a]:16+e.insetLevel*56+"px"}});function y(a){m.value===!0&&(_.value!==null&&(a.qKeyEvent!==!0&&document.activeElement===c.value?_.value.focus():document.activeElement===_.value&&c.value.focus()),f(a))}function k(a){if(m.value===!0&&A(a,13)===!0){Q(a),a.qKeyEvent=!0;const C=new MouseEvent("click",a);C.qKeyEvent=!0,c.value.dispatchEvent(C)}n("keyup",a)}function T(){const a=F(l.default,[]);return m.value===!0&&a.unshift(r("div",{class:"q-focus-helper",tabindex:-1,ref:_})),a}return()=>{const a={ref:c,class:w.value,style:q.value,role:"listitem",onClick:y,onKeyup:k};return m.value===!0?(a.tabindex=e.tabindex||"0",Object.assign(a,h.value)):S.value===!0&&(a["aria-disabled"]="true"),r(o.value,a,T())}}}),te=B({name:"QList",props:{...N,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:l}){const n=M(),s=R(e,n.proxy.$q),g=d(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(s.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>r(e.tag,{class:g.value},U(l.default))}});const O={ratio:[String,Number]};function J(e,l){return d(()=>{const n=Number(e.ratio||(l!==void 0?l.value:void 0));return isNaN(n)!==!0&&n>0?{paddingBottom:`${100/n}%`}:null})}const V=16/9;var ae=B({name:"QImg",props:{...O,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:V},placeholderSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:l,emit:n}){const s=v(e.initialRatio),g=J(e,s);let i=null,h=!1;const u=[v(null),v(y())],o=v(0),f=v(!1),c=v(!1),_=d(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),S=d(()=>({width:e.width,height:e.height})),m=d(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition`),w=d(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));H(()=>q(),k);function q(){return e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null}function y(){return e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null}function k(t){i!==null&&(clearTimeout(i),i=null),c.value=!1,t===null?(f.value=!1,u[o.value^1].value=y()):f.value=!0,u[o.value].value=t}function T({target:t}){h!==!0&&(i!==null&&(clearTimeout(i),i=null),s.value=t.naturalHeight===0?.5:t.naturalWidth/t.naturalHeight,a(t,1))}function a(t,$){h===!0||$===1e3||(t.complete===!0?C(t):i=setTimeout(()=>{i=null,a(t,$+1)},50))}function C(t){h!==!0&&(o.value=o.value^1,u[o.value].value=null,f.value=!1,c.value=!1,n("load",t.currentSrc||t.src))}function D(t){i!==null&&(clearTimeout(i),i=null),f.value=!1,c.value=!0,u[o.value].value=null,u[o.value^1].value=y(),n("error",t)}function L(t){const $=u[t].value,I={key:"img_"+t,class:m.value,style:w.value,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...$};return o.value===t?(I.class+=" q-img__image--waiting",Object.assign(I,{onLoad:T,onError:D})):I.class+=" q-img__image--loaded",r("div",{class:"q-img__container absolute-full",key:"img"+t},r("img",I))}function E(){return f.value!==!0?r("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},U(l[c.value===!0?"error":"default"])):r("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},l.loading!==void 0?l.loading():e.noSpinner===!0?void 0:[r(P,{color:e.spinnerColor,size:e.spinnerSize})])}return k(q()),j(()=>{h=!0,i!==null&&(clearTimeout(i),i=null)}),()=>{const t=[];return g.value!==null&&t.push(r("div",{key:"filler",style:g.value})),c.value!==!0&&(u[0].value!==null&&t.push(L(0)),u[1].value!==null&&t.push(L(1))),t.push(r(K,{name:"q-transition--fade"},E)),r("div",{class:_.value,style:S.value,role:"img","aria-label":e.alt},t)}}});const ie=e=>{const l=new Date(e),n=l.getHours(),s=l.getMinutes(),g=n>9?n:`0${n}`,i=s>9?s:`0${s}`;return`${g}:${i}`};export{ee as Q,ae as a,te as b,ie as c,X as d,Y as e,G as f,Z as g,p as h};
