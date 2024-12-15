design ideas
- https://dribbble.com/shots/6172851-NathanBarry-com 

images for here

- https://unsplash.com/photos/silver-macbook-air-on-table-near-imac-jJT2r2n7lYA
- https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-nPnIOAM8pbo


Some cool stuff

```html
<div class="row" style="border-bottom: solid 1px #64646f33; box-shadow: #64646f33 0 10px 29px; position: relative;">
    <div class="govcy-col-6  govcy-mb-3">
        <h1 class="govcy-mt-3 govcy-mb-5 govcy-fs-2">Hello, I'm Constantinos Evangelou</h1>        
        <p class="govcy-fs-5">I am an interaction designer working for the <a href="https://dsf.dmrid.gov.cy" target="_blank">Digital Services Factory (DSF)</a> who loves to play with code.</p>
    </div>
    <div class="govcy-col-6 govcy-my-3" style="position: relative;">
        <img src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            class="govcy-mt-3"
             alt="Decorative image" 
             style="width: 100%; height: auto; position: absolute; top: 0; left: 0;">
    </div>
</div>

```



```html
<ul class="govcy-pl-0"> 
{% for project in site.localization[locale]["projects"] %}
    <li class="nav-side"> <a href="{{project.url}}" target="_blank">{% if project.type == "github"%}<i class="bi bi-github govcy-text-body"></i> {% elif project.type == "npm"%}<span class="govcy-text-body govcy-fw-bolder govcy-text-deco-none">npm</span> {% elif project.type == "figma"%}<img src="../../img/figmaicon.png" aria-hidden="true" class="img-icon"/>{% endif %}{{project.name}}</a><div class="govcy-mt-1">{{project.description}}</div></li>
{% endfor %}
</ul>
```