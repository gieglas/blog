---
title: "Constantinos Evangelou"
category: "home"
hideSearch: true
layout: "baseHome.njk"
---
<style>
main li {
    margin-bottom: 5px;
    list-style-type: "– ";
}
</style>
<div class="row pop-medium govcy-rounded-2">
    <div class="govcy-col-6 govcy-mb-3">
        <h1 class="govcy-mt-3 govcy-mb-5 govcy-fs-2">Hello, I'm Constantinos</h1>
        <p class="govcy-fs-5">I am an interaction designer working for the <a href="https://dsf.dmrid.gov.cy" target="_blank">Digital Services Factory (DSF)</a> who loves to play with code and this is where I write about stuff.</p>
    </div>
    <div class="govcy-col-6 govcy-my-3">
        <img class="govcy-mt-3 img-fluid pop-small" src="{{'/img/DS-in-cafe.jpg' | url}}" alt="Decorative image">
    </div>
</div>


<div class="row"><div class="govcy-col-8 govcy-mt-4">

## Latest posts
<ul class="govcy-pl-0" data-pagefind-ignore>{% for pag in collections["recentPosts"]  %}
<li class="nav-side govcy-br-bottom-1 govcy-br-bottom-standard govcy-py-2 govcy-mb-4"><a class="govcy-fw-bold" href="{{ pag.url | url }}">{{ pag.data.title }}</a>
    <p class="post-date govcy-mb-1">Posted on <time datetime="{{ pag.date | dateISO }}">{{ pag.date | dateOnly }}</time> • Tagged with {% for tag in pag.data.tags -%}
        {% if tag !== 'blog' and tag !== 'en' %}<a class="post-tag" href="{{ ('/tags/' ~ tag) | url }}">{{ tag }}</a>{% endif %}{%- endfor %}</p>
    {% if pag.data.image %}<a href="{{ pag.url | url }}"><img aria-hidden="true" style="height:100px" src="{{ (site.imagesLocation ~ pag.data.image) | url }}" alt="graphic for {{ pag.data.title }}" class="img-fluid govcy-mb-2"></a>{% endif %}
    <p>{{pag.data.summary}}</p></li>
{% endfor %}</ul>

[See all posts →](../blog)

</div></div>