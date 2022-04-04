const toggle1 = document.querySelector(".toggle1");
const toggle2 = document.querySelector(".toggle2");
const radio_buttons = document.querySelector(".radio-button");
const shortbio_resume = document.querySelector(".shortbio-resume");
const wave = document.querySelector(".wave");
const header = document.querySelector(".header");
const education = document.querySelectorAll(".eduhead");
const allArticle = document.querySelector(".allArticle");
toggle1.checked = true;

radio_buttons.addEventListener("click", (e) => {
  clearInterval(intv);
  if (e.target == toggle2) {
    wave.style.display = "none";
    header.style.backgroundImage =
      "url('https://i.pinimg.com/originals/70/00/82/700082fda66b852d689cde9ec55c3e3b.gif')";
    shortbio_resume.style.display = "block";
  }
  if (e.target == toggle1) {
    shortbio_resume.style.display = "none";
    header.style.backgroundImage = "url('./img/giphy (1).gif')";
    wave.style.display = "block";
  }
});

const intv = setInterval(() => {
  if (toggle2.checked) {
    toggle2.checked = false;
    shortbio_resume.style.display = "none";
    toggle1.checked = true;
    wave.style.display = "block";
    header.style.backgroundImage = "url('./img/giphy (1).gif')";
  } else {
    toggle1.checked = false;
    wave.style.display = "none";
    toggle2.checked = true;
    shortbio_resume.style.display = "block";
    header.style.backgroundImage =
      "url('https://i.pinimg.com/originals/70/00/82/700082fda66b852d689cde9ec55c3e3b.gif')";
  }
}, 4000);

for (let index = 0; index < education.length; index++) {
  education[index].addEventListener("click", () => {
    if (education[index].classList.contains("displaying")) {
      education[index].classList.remove("displaying");
      education[index].children[1].innerHTML = "&#9652;";
      const sibling = education[index].nextElementSibling;
      sibling.style.maxHeight = "0px";
    } else {
      education[index].classList.add("displaying");
      education[index].children[1].innerHTML = "&#9662;";
      const sibling = education[index].nextElementSibling;
      const heght = sibling.scrollHeight + "px";
      sibling.style.maxHeight = heght;
    }
  });
}

const query = `
    {
      user(username: "manavgupta") {
        publication {
          posts{
            slug
            title
            brief
            coverImage
          }
        }
      }
    }
  `;

async function gql(query) {
  const response = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  return response.json();
}
gql(query).then((resp) => {
  // consuming promise
  const apiresponse = resp.data.user.publication.posts;
  apiresponse.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = post.coverImage;
    card.appendChild(img);

    const desc = document.createElement("div");
    desc.classList.add("desc");

    const title = document.createElement("h2");
    title.innerText = post.title;
    desc.appendChild(title);

    const brief = document.createElement("p");
    brief.innerText = post.brief;
    desc.appendChild(brief);

    card.appendChild(desc);
    allArticle.appendChild(card);

    card.addEventListener("click", () => {
      location.href = `https://manavgupta.hashnode.dev/${post.slug}`;
    });
  });
});

// const section = document.querySelectorAll("section");
// const nav = document.querySelectorAll(".navigation li a");
// window.addEventListener('scroll',()=>{
//     let current = "";
//     section.forEach((section)=>{
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;
//         if(window.scrollY >= sectionTop){
//             current = section.getAttribute('id');
//         }
//         nav.forEach((li)=>{
//             li.classList.remove("active");
//             if(li.classList.contains(current)){
//                 li.classList.add('active')
//             }
//         })
//     })
// })
