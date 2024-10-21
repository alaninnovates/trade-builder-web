import os
import glob


if __name__ == '__main__':
    stickers_dict = {}
    folders = glob.glob('assets/*')
    for folder in folders:
        stickers_dict[os.path.basename(folder)] = {}
        for file in glob.glob(folder + '/*'):
            stickers_dict[os.path.basename(folder)][os.path.basename(file).split('.')[0]] = file
    print(stickers_dict)
