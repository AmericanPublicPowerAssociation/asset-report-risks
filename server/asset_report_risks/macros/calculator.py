def get_percent(partial_count, total_count, zero_value=0):
    try:
        return int(100 * partial_count / total_count)
    except ZeroDivisionError:
        return zero_value
