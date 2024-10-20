const relatedButton=document.getElementById("related"),latestButton=document.getElementById("latest"),postsContainer=document.getElementById("postsR");let activeFeed="related";const postsPerPage=6,animation=3,tagL=document.getElementById("related").getAttribute("data-label"),relatedFeedUrl=`/feeds/posts/default/-/${tagL}?alt=json`,latestFeedUrl="/feeds/posts/default?alt=json";function setActiveButton(e){relatedButton.classList.remove("selected"),latestButton.classList.remove("selected"),e.classList.add("selected")}function fetchPosts(e){postsContainer.innerHTML=generateSkeletonHTML(3),fetch(e).then(e=>e.json()).then(e=>{let t=e.feed.entry||[],s="";t.slice(0,6).forEach(e=>{let t=e.title.$t,a=e.link.find(e=>"alternate"===e.rel).href;imageUrl=e.media$thumbnail?e.media$thumbnail.url.replace(/\/s\d+\-c\//,"/s300-c/"):"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7gSvkTm6-PuGZ2ni5DCI8oGcunBYrCBSvAJvZ0s881WWOmbP2F2T2j9gYpEDpiGNqipehIA46Eb0WEZqYwC8nH3LEz6zQPNnzcS9vGkaMFZq21Y8kGPvQhsI4qWxjvqKL5b-fSjVmD8P9GJli-aOyv4b9rYPCrjWsH1NFrZN8K8U_ett_MFiSBhkaemAW/s1600/noImage.png";let l=e=>{let t=new Date(e);return t.toISOString()},n=l(e.published.$t),i=e.updated?l(e.updated.$t):n,d=e.category?e.category.map(e=>e.term):[],o=d.length>0?d[0]:"",r=d.includes("Product")||d.includes("Sponsored");s+=`
<article>
<div class='img shrink'>
<a href="${a}" aria-label="Thumbnail">
<img src="${imageUrl}" loading="lazy" alt="${t}">
</a>
</div>
<div class="cInherit grow flex column">
<div class='pH info flex fontM'>
${r?"":`<time data-format="short" datetime='${i}' class="time ellips opacity update shrink">---</time>`}
<div class="label ellips" data-text='in'><a data-text='${o}' href='/${o}'></a></div>
</div>
<div class='pT'>
<h2 class="name"><a href="${a}">${t}</a></h2>
</div>
</div>
</article>
`}),postsContainer.innerHTML=s||"No posts found."}).catch(e=>{postsContainer.innerHTML="Failed to load posts.",console.error("Error fetching posts:",e)})}function generateSkeletonHTML(e){let t="";for(let s=0;s<e;s++)t+=`<div class="skeleton"><div class="skeleton-m"><div class="skeleton-img s-bg"></div><div class="skeleton-co"><div class="skeleton-c s-bg"></div><div class="skeleton-h s-bg"></div><div class="skeleton-h s s-bg"></div></div></div></div>`;return t}relatedButton.addEventListener("click",function(){setActiveButton(relatedButton),activeFeed="related",fetchPosts(relatedFeedUrl)}),latestButton.addEventListener("click",function(){setActiveButton(latestButton),activeFeed="latest",fetchPosts("/feeds/posts/default?alt=json")}),setActiveButton(relatedButton),fetchPosts(relatedFeedUrl);
