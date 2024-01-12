const uls = document.querySelectorAll("nav ul");
const links = [...document.querySelectorAll("nav a")];
const light = document.querySelector("nav .tubelight");

let activeIndex = 0;
let currentIndex = 0;
let Increment = 1;

links.forEach((link, index)=>
{
    if(links[index].classList.contains("active"))
    {
        light.style.left = `${links[index].offsetLeft + light.offsetWidth / 4}px`;
    }
    link.addEventListener("click", (e)=>
    {
        activeIndex = index;
        let t = setInterval(()=>
        {
            if(activeIndex > currentIndex) Increment =1;
            else if(activeIndex < currentIndex) Increment =-1;
            currentIndex += Increment;

            links[currentIndex].classList.add("active");
            if(currentIndex != -1)
            {
                links[currentIndex-Increment].classList.remove("active");
            }
            if(currentIndex == activeIndex)
            {
                e.target.classList.add("active");
                Increment = 0;
                clearInterval(t);
            }
        },50);
        light.style.left = `${e.target.offsetLeft + light.offsetWidth / 4}px`;
    });
});