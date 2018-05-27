---
layout: page
title: Locations
---

{% assign groups = site.locations | group_by: 'category' %}
{% for group in groups %}
  <h4>{{ site.data.categories[group.name].title  }}</h4>
  <ul>
    {% for item in group.items %}
      <li>
        <a href="{{ item.url }}">{{ item.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
