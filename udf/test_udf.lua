local function my_filter_fn(rec)
    local isActive = rec['isActive'] or 0
    if isActive == 1 then
        return true
    else
        return false
    end
end

local function my_map_fn(rec)
   local result = map()
        result['isActive'] = rec['isActive']
   return result
end

function test_fn(stream)
    return stream : filter(my_filter_fn) : map(my_map_fn)
end
