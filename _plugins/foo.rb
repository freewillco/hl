# A simple way to inspect liquid template variables.
# Usage:
#  Can be used anywhere liquid syntax is parsed (templates, includes, posts/pages)
#  {{ site | debug }}
#  {{ site.posts | debug }}
#
require 'json'

class Object
  def instance_variables_hash
    Hash[instance_variables.map { |name| [name, instance_variable_get(name)] } ]
  end
end

module Jekyll
  module FooFilter
    
    def bar(obj)
      obj.map { |x| x.instance_variable_get('pos'.to_sym) }.to_json
    end

  end
end

Liquid::Template.register_filter(Jekyll::FooFilter)