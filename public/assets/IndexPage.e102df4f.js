import{c as w,i as T,e as g,d,h as r,f as N,l as M,a as Q,g as B,aH as E,a4 as k,B as v,C as S,D as H,a6 as h,a8 as L,a9 as z,aI as F,E as f,F as y,aD as x,G as $,a2 as R,ad as I,r as b,ab as A,aJ as P,a5 as D,w as U}from"./index.5b94c506.js";import{Q as G,c as V,b as j,a as K,h as J}from"./calculateTime.cc0e763e.js";import{_ as O}from"./plugin-vue_export-helper.21dcd24c.js";var W=w({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:t}){const{proxy:{$q:n}}=B(),s=T(M,g);if(s===g)return console.error("QPage needs to be a deep child of QLayout"),g;if(T(Q,g)===g)return console.error("QPage needs to be child of QPageContainer"),g;const m=d(()=>{const c=(s.header.space===!0?s.header.size:0)+(s.footer.space===!0?s.footer.size:0);if(typeof e.styleFn=="function"){const C=s.isContainer.value===!0?s.containerHeight.value:n.screen.height;return e.styleFn(c,C)}return{minHeight:s.isContainer.value===!0?s.containerHeight.value-c+"px":n.screen.height===0?c!==0?`calc(100vh - ${c}px)`:"100vh":n.screen.height-c+"px"}}),i=d(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>r("main",{class:i.value,style:m.value},N(t.default))}}),X=w({name:"QChatMessage",props:{sent:Boolean,label:String,bgColor:String,textColor:String,name:String,avatar:String,text:Array,stamp:String,size:String,labelHtml:Boolean,nameHtml:Boolean,textHtml:Boolean,stampHtml:Boolean},setup(e,{slots:t}){const n=d(()=>e.sent===!0?"sent":"received"),s=d(()=>`q-message-text-content q-message-text-content--${n.value}`+(e.textColor!==void 0?` text-${e.textColor}`:"")),a=d(()=>`q-message-text q-message-text--${n.value}`+(e.bgColor!==void 0?` text-${e.bgColor}`:"")),m=d(()=>"q-message-container row items-end no-wrap"+(e.sent===!0?" reverse":"")),i=d(()=>e.size!==void 0?`col-${e.size}`:""),c=d(()=>({msg:e.textHtml===!0?"innerHTML":"textContent",stamp:e.stampHtml===!0?"innerHTML":"textContent",name:e.nameHtml===!0?"innerHTML":"textContent",label:e.labelHtml===!0?"innerHTML":"textContent"}));function C(o){return t.stamp!==void 0?[o,r("div",{class:"q-message-stamp"},t.stamp())]:e.stamp?[o,r("div",{class:"q-message-stamp",[c.value.stamp]:e.stamp})]:[o]}function p(o,_){const l=_===!0?o.length>1?u=>u:u=>r("div",[u]):u=>r("div",{[c.value.msg]:u});return o.map((u,q)=>r("div",{key:q,class:a.value},[r("div",{class:s.value},C(l(u)))]))}return()=>{const o=[];t.avatar!==void 0?o.push(t.avatar()):e.avatar!==void 0&&o.push(r("img",{class:`q-message-avatar q-message-avatar--${n.value}`,src:e.avatar,"aria-hidden":"true"}));const _=[];t.name!==void 0?_.push(r("div",{class:`q-message-name q-message-name--${n.value}`},t.name())):e.name!==void 0&&_.push(r("div",{class:`q-message-name q-message-name--${n.value}`,[c.value.name]:e.name})),t.default!==void 0?_.push(p(E(t.default()),!0)):e.text!==void 0&&_.push(p(e.text)),o.push(r("div",{class:i.value},_));const l=[];return t.label!==void 0?l.push(r("div",{class:"q-message-label"},t.label())):e.label!==void 0&&l.push(r("div",{class:"q-message-label",[c.value.label]:e.label})),l.push(r("div",{class:m.value},o)),r("div",{class:`q-message q-message-${n.value}`},l)}}});const Y={__name:"MessagesList",props:{messages:Array},setup(e){const t=k(),n=d(()=>t.getters["chat/GET_CURRENT_USER"]),s=a=>{var m;return((m=n.value)==null?void 0:m.id)===a};return(a,m)=>(v(),S(j,{class:"list-size"},{default:H(()=>[(v(!0),h(L,null,z(e.messages,i=>(v(),S(G,{key:i.id,class:F({"justify-end":s(i.senderId)})},{default:H(()=>[f(X,{text:[i.content],name:i.senderDisplayName,avatar:i.senderAvatarUrl,sent:s(i.senderId),stamp:y(V)(i.created_at)},null,8,["text","name","avatar","sent","stamp"])]),_:2},1032,["class"]))),128))]),_:1}))}};var Z=O(Y,[["__scopeId","data-v-86b81e3c"]]);x`
  query getCurrentIdCalls($user_id: String!) {
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
`;x`
  query getUsersLastSeen($last_seen: timestamptz) {
    users(where: { last_seen: { _gte: $last_seen } }) {
      id
      last_seen
    }
  }
`;x`
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
`;x`
  query getUsers {
    users {
      id
      first_name
      email
      avatar_url
    }
  }
`;x`
  query getUserById($id: String) {
    users(where: { id: { _eq: $id } }) {
      first_name
      email
    }
  }
`;x`
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
`;const ee={class:"flex items-center justify-between bg-grey-4",style:{"min-height":"4rem"}},ae={class:"flex items-center"},te={class:"q-ml-md text-h5"},se={__name:"ChatHeader",props:{title:String,avatarUrl:String},setup(e){const t=T("setTrueForShowVideoTrack");return(n,s)=>(v(),h("header",ee,[$("div",ae,[$("div",null,[f(K,{class:"q-ml-md avatar-min-size",src:e.avatarUrl},null,8,["src"])]),$("span",te,R(e.title),1),f(I,{class:"q-mx-md text-h5 text-primary cur-pointer",name:"videocam",onClick:y(t)},null,8,["onClick"])]),f(I,{class:"q-mx-md text-h5 text-primary cur-pointer",name:"arrow_back"})]))}};const ne={class:"flex column relative w-100p"},re={key:0,class:"flex justify-center items-center"},ie=$("span",{class:"text-h3 text-center"},"\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0442...",-1),le=[ie],ce={key:1},oe={key:0,class:"text-center text-h3"},ue={__name:"ChatSpace",setup(e){var _;const t=k(),n=b(""),s=b(""),a=d(()=>t.getters["chat/GET_CURRENT_CHAT"]),m=d(()=>t.getters["chat/GET_CURRENT_CALL"]),i=d(()=>t.getters["chat/GET_CURRENT_USER"]),c=b({chat_id:(_=a==null?void 0:a.value)==null?void 0:_.id}),{mutate:C}=A(P),{result:p,loading:o}=D(J,c);return U(a,async l=>{c.value.chat_id=l==null?void 0:l.id,i.value.id===a.value.sender_id?(n.value=a.value.consumer_avatar,s.value=a.value.consumer_firstName):(n.value=a.value.sender_avatar,s.value=a.value.sender_firstName)}),U(m,async l=>{if(!!l){m.value===a.value.call_id&&console.log("equal"),i.value.id===a.value.sender_id?(a.value.sender_id,a.value.consumer_id):(a.value.consumer_id,a.value.sender_id);try{const{data:u}=await C({id:a.value.id,call_id:l});console.log(u)}catch(u){console.log(u)}}}),(l,u)=>{var q;return v(),h("div",ne,[y(a)?(v(),h("div",ce,[f(se,{title:s.value,avatarUrl:n.value},null,8,["title","avatarUrl"]),y(o)?(v(),h("div",oe," \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439... ")):(v(),S(Z,{key:1,messages:(q=y(p))==null?void 0:q.messages},null,8,["messages"]))])):(v(),h("div",re,le))])}}},ve={__name:"IndexPage",setup(e){return(t,n)=>(v(),S(W,{class:"flex"},{default:H(()=>[f(ue)]),_:1}))}};export{ve as default};
