---
layout: page
title: Habitat Loss
tagline: Tracking habitat loss
---

Lots of manually authored stuff here!

<div class="home">

  {%- if site.posts.size > 0 -%}
    <h2>Posts</h2>
    <ul class="post-list">
      {%- for post in site.posts -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="post-meta">{{ post.date | date: date_format }}</span>
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
          </a>
        </h3>
        {%- if site.show_excerpts -%}
          {{ post.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

  {%- if site.locations.size > 0 -%}
    <h2>Locations</h2>
    <ul class="post-list">
      {%- for location in site.locations -%}
      <li>
        {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
        <span class="location-meta">{{ location.date | date: date_format }}</span>
        <h3>
          <a class="location-link" href="{{ location.url | relative_url }}">
            {{ location.title | escape }}
          </a>
        </h3>
        {%- if site.show_excerpts -%}
          {{ location.excerpt }}
        {%- endif -%}
      </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}

  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>

</div>
