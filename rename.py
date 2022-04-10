import os,sys

folder = '.'

def main():
    gd =sys.argv[-1]
    if os.path.isfile(gd):
        # sys.argv[-1] = os.path.dirname(gd)
        sys.argv[-1] =os.getcwd()
        return main()
        # gd = os.path.dirname(gd)
    for i in os.scandir(gd):
        if i.is_file():
          p,ext= gd.splittext(i)
          if ext == '.js':
            print(i)
            
            continue
        sys.argv.append(i.path)
        try:
            main()
        except Exception as e:
            print("Exception", str(e))
        # run_path(__file__,run_name='__main__')
main()