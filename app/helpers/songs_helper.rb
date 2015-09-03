module SongsHelper
	def sanitize(item)
		if item.nil? || item.empty?
			return "untitled"
		else
			return item
		end
	end

	def sanitize_genre(genre)
		if genre.nil? 
			return "untitled"
		else
			return genre.gsub(/\x00/, "")
		end
	end
end
