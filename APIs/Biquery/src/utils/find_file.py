from os.path import join, dirname, exists

def find(filename):
    envpath = dirname(__file__)
    while envpath != '/' and not exists(join(envpath, filename)):    
        envpath = dirname(envpath)

    return envpath