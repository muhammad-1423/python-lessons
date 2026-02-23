#print('Hello World')
#print("To'qqizning kvadrati",9**2,"ga teng")
#t_yil=int(input("Tug'ilgan yilingizni kiriting ?"))
#yosh=2026-t_yil
#print(f"Siz {yosh} yoshda ekansiz")
#cars=['bmw','nexia','mers','tahoe','audi','ford']
#a=len(cars)
#t_yil=int(input('Tugilgan yilingizni kiriting ?'))
#yosh=2026-t_yil
#if yosh>=18:
   # print('Kirish mumkin')
#else:
    #print('Hali balogatga yetmagansiz')
#for car in cars:
 #   print(car)
#cars.append('toyota')
#print(cars)
menu = ['osh','qazonkabob','shashlik','norin','somsa']
buyurtmalar = ["osh","somsa","manti", "shashlik"]

if buyurtmalar: # ro'yxatda biror element bo'lsa bu ifoda TRUE qaytaradi
    for taom in buyurtmalar:
        if taom in menu:
            print(f"Menuda {taom} bor")
        else:
            print(f"Kechirasiz, menuda {taom} yo'q")
else: # agar ro'yxat bo'sh bo'lsa
    print("Savatchangiz bo'sh!")