module ApplicationHelper
  def sortable(column, id, title = nil)
    title ||= column.titleize
    css_class = column == sort_column ? "current #{sort_direction}" : nil
    if css_class != nil
      icon_class = css_class == "current asc" ? "fa  fa-chevron-circle-up" : "fa fa-chevron-circle-down"
    end
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    link_to playlist_path(id, :sort => column, :direction => direction), {:class => css_class} do
        if icon_class
          raw(title + " <i class='"+ icon_class + "'></i>")
        else
          title
        end
    end

    # link_to title, {:sort => column, :direction => direction}, {:class => css_class}
  end
end
