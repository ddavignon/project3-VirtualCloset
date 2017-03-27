def getLowTemp(name):
    if 'shirt' in name:
        return 50
    elif 'pants' in name:
        return 30
    elif 'jacket' in name:
        return 20
    elif 'shorts' in name:
        return 50
    elif 'sweater' in name:
        return 10
    return '-100'
    
def getHighTemp(name):
    if 'shirt' in name:
        return 90
    elif 'pants' in name:
        return 70
    elif 'jacket' in name:
        return 70
    elif 'shorts' in name:
        return 120
    elif 'sweater' in name:
        return 60
    return '200'
    