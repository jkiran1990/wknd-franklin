import { createOptimizedPicture } from '../../scripts/aem.js';


     
export default async function decorate(block) {
  const response = await fetch("query-index.json");
  const jsonData = await response.json();
 
  const articleData = jsonData.data.filter(item => item.article.includes("true"));
  
  if(articleData){
    const articleCardWrapper= document.createElement('div');
    articleCardWrapper.className='articleWrapper';

      articleData.forEach(item => {
        const articleCard = document.createElement('div');
        articleCard.className = 'articleCard';
        const heroImage = document.createElement('img');
        heroImage.src=item.image;
        heroImage.alt='article';
        const title=document.createElement('h3');
        title.textContent=item.title;
        const description = document.createElement('div');
        description.className='description';
        description.textContent=item.description;
        articleCard.appendChild(heroImage);
        articleCard.appendChild(title);
        articleCard.appendChild(description);
        articleCard.addEventListener('click',()=>{
          window.location.href=item.path;
        });
        articleCardWrapper.appendChild(articleCard);
        block.appendChild(articleCardWrapper);
        
      });
    
 
  }

}