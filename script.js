const items=[['Farm House','Onion, capsicum, tomato, mushroom, corn & olives',249,'veg','https://image.cdn.shpy.in/438877/SKU-1236_0-1778130476444.jpg?format=webp&width=900'],['Paneer Tikka','Paneer tikka, capsicum, onion & special tikka sauce',279,'veg','https://b.zmtcdn.com/data/pictures/chains/7/21259077/6c9af395dca4459f658ad347b7bff79d.jpeg'],['Margherita','100% mozzarella cheese & fresh basil',199,'veg','https://www.dissapore.com/wp-content/uploads/2015/08/Pizza-Margherita-950x950.jpg'],['Chicken Tikka','Grilled chicken tikka with onion & capsicum',299,'nonveg','https://image.cdn.shpy.in/438877/SKU-1236_0-1778130476444.jpg?format=webp&width=900'],['Chicken Fajita','Spicy fajita chicken with onion & paprika',299,'nonveg','https://a.storyblok.com/f/266035/2048X1536/deb74a4b36/margherita-pizza.jpg'],['Pepperoni','Classic pepperoni slices with mozzarella cheese',299,'nonveg','https://format.creatorcdn.com/6df4cd8f-6a92-4b4b-ad8c-e31d0cf17001/0/0/0/0%2C0%2C2500%2C2265%2C2500%2C1200/0-0-0/c956dc40-46bd-4ef1-ab73-18288d5a4cea/1/1/Pizza%2BPhase%2B9%2B2022%2BJL.jpg'],['Garlic Bread','Crispy garlic bread with herbs & cheese',99,'sides','https://tb-static.uber.com/prod/image-proc/processed_images/0187c8d075ec251ad9d4b447fe4c10a8/5954bcb006b10dbfd0bc160f6370faf3.jpeg'],['Creamy Pasta','Rich creamy pasta with herbs and cheese',199,'sides','https://mir-s3-cdn-cf.behance.net/project_modules/1400/561450154944545.634ed66f0025c.jpg']];
let cart=[];
function render(filter='all'){const g=document.getElementById('grid');g.innerHTML=items.map((x,i)=>({x,i})).filter(o=>filter==='all'||o.x[3]===filter).map(o=>{const x=o.x,i=o.i;return `<article class="card"><div class="photo" style="background-image:url('${x[4]}')"></div><div class="info"><h3>${x[0]}</h3><p>${x[1]}</p><div class="row"><span class="price">₹${x[2]}</span><button class="add" onclick="add(${i})">ADD TO CART</button></div></div></article>`}).join('')}
function add(i){cart.push({name:items[i][0],price:items[i][2],detail:items[i][1]});update();document.getElementById('drawer').classList.add('open')}
function removeItem(i){cart.splice(i,1);update()}
function update(){document.getElementById('count').textContent=cart.length;document.getElementById('items').innerHTML=cart.length?cart.map((x,i)=>`<div class="item"><div><span>${x.name}</span><small>${x.detail||''}</small></div><b>₹${x.price} <button onclick="removeItem(${i})">×</button></b></div>`).join(''):'<p>Your cart is empty 🍕</p>';document.getElementById('total').textContent='₹'+cart.reduce((a,x)=>a+x.price,0)}
function getSelected(){let total=0,vals={};document.querySelectorAll('.options,.visual-options,.clean-options,.mini-options').forEach(group=>{const c=group.querySelector('.choice.active,.visual-choice.active,.clean-choice.active,.mini-choice.active');if(c){vals[group.dataset.group]=c.dataset.value;total+=Number(c.dataset.price||0)}});document.querySelectorAll('.ingredient.selected').forEach(t=>total+=Number(t.dataset.price));return {...vals,total}}
const toppingClasses={"Onion":"onion","Capsicum":"capsicum","Sweet Corn":"corn","Mushroom":"mushroom","Jalapeño":"jalapeno","Paneer Tikka":"paneer","Chicken Tikka":"chicken","Black Olives":"olives"};
const toppingSeeds={
  "Onion":[[22,32],[52,24],[70,43],[35,62],[60,68]],
  "Capsicum":[[36,23],[75,30],[24,55],[50,49],[72,63]],
  "Sweet Corn":[[28,42],[45,30],[64,37],[39,73],[68,72]],
  "Mushroom":[[48,20],[76,48],[28,70],[58,56],[20,40]],
  "Jalapeño":[[31,34],[60,22],[77,57],[44,61],[67,72]],
  "Paneer Tikka":[[20,50],[42,22],[66,31],[54,58],[31,74]],
  "Chicken Tikka":[[27,27],[56,28],[74,48],[42,55],[65,68]],
  "Black Olives":[[37,42],[58,42],[24,66],[72,27],[52,75]]
};
function updateCustomizer(){
  const s=getSelected();
  document.getElementById('customPrice').textContent='₹'+s.total;
  document.getElementById('footerPrice').textContent='₹'+s.total;
  const preview=document.getElementById('previewPizza');
  preview.className='pizza-builder-preview '+(s.size||'Medium').toLowerCase()+' '+(s.dough||'').toLowerCase().replace(/[^a-z]+/g,'-')+' '+(s.crust||'').toLowerCase().replace(/[^a-z]+/g,'-')+' '+(s.sauce||'').toLowerCase();
  const finish=document.getElementById('previewFinish');
  finish.className='pizza-finish '+(s.crust||'').toLowerCase().replace(/[^a-z]+/g,'-');
  const cheese=document.querySelector('.mini-choice.active[data-group="cheese"]') || document.querySelector('[data-group="cheese"] .mini-choice.active');
  const tops=[...document.querySelectorAll('.ingredient.selected')];
  const names=tops.map(x=>x.dataset.value);
  document.getElementById('previewSummary').textContent=`${s.size} · ${s.dough} · ${s.crust} · ${s.sauce} · ${s.cheese}${names.length?' · '+names.join(', '):''}`;
  document.getElementById('previewName').textContent=`${s.size} Custom Pizza`;
  const layer=document.getElementById('previewToppings');
  let html='';
  tops.forEach(t=>{
    const name=t.dataset.value, cls=toppingClasses[name]||'';
    (toppingSeeds[name]||[]).forEach((xy,j)=>{
      html+=`<span class="live-topping ${cls}" style="left:${xy[0]}%;top:${xy[1]}%;animation-delay:${j*35}ms"></span>`;
    });
  });
  layer.innerHTML=html;
}

function openCustomizer(){document.getElementById('customModal').classList.add('open');document.body.classList.add('locked');updateCustomizer()}
function closeCustomizer(){document.getElementById('customModal').classList.remove('open');document.body.classList.remove('locked')}
function addCustom(){const s=getSelected();const tops=[...document.querySelectorAll('.ingredient.selected')].map(x=>x.dataset.value);const note=document.getElementById('customNote').value.trim();let detail=`${s.dough} · ${s.crust} · ${s.sauce} · ${s.cheese}${tops.length?' · '+tops.join(', '):' · No extra toppings'}`;if(note)detail+=` · Note: ${note}`;cart.push({name:`${s.size} Custom Pizza`,price:s.total,detail,custom:true});update();closeCustomizer();document.getElementById('drawer').classList.add('open')}
document.addEventListener('DOMContentLoaded',()=>{render();document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.filter)});document.getElementById('cart').onclick=()=>document.getElementById('drawer').classList.add('open');document.getElementById('close').onclick=()=>document.getElementById('drawer').classList.remove('open');document.getElementById('drawer').onclick=e=>{if(e.target.id==='drawer')e.currentTarget.classList.remove('open')};document.getElementById('hamb').onclick=()=>{const n=document.querySelector('nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='78px';n.style.left='0';n.style.right='0';n.style.padding='20px';n.style.background='#0b0b0b';n.style.flexDirection='column'};document.getElementById('openCustomizer').onclick=openCustomizer;document.getElementById('closeCustomizer').onclick=closeCustomizer;document.getElementById('customModal').onclick=e=>{if(e.target.id==='customModal')closeCustomizer()};document.querySelectorAll('.visual-options,.clean-options,.dough-options,.mini-options').forEach(group=>group.addEventListener('click',e=>{const c=e.target.closest('.visual-choice,.clean-choice,.dough-choice,.mini-choice');if(!c)return;group.querySelectorAll('.visual-choice,.clean-choice,.dough-choice,.mini-choice').forEach(x=>x.classList.remove('active'));c.classList.add('active');updateCustomizer()}));document.querySelectorAll('.ingredient').forEach(t=>t.onclick=()=>{t.classList.toggle('selected');updateCustomizer()});document.getElementById('addCustom').onclick=addCustom;document.getElementById('checkout').onclick=()=>alert(cart.length?'Checkout/backend can be connected next. Your cart is ready! 🍕':'Add something to your cart first.');update()});
