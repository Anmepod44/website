import matplotlib.pyplot as plt


def decrypt(text:str):

    letter_frequencies = {
        'E': 12.70,
        'T': 9.06,
        'A': 8.17,
        'O': 7.51,
        'I': 6.97,
        'N': 6.75,
        'S': 6.33,
        'H': 6.09,
        'R': 5.99,
        'D': 4.25,
        'L': 4.03,
        'U': 2.76,
        'M': 2.41,
        'W': 2.36,
        'F': 2.23,
        'G': 2.02,
        'Y': 1.97,
        'P': 1.93,
        'B': 1.29,
        'V': 0.98,
        'K': 0.77,
        'X': 0.15,
        'J': 0.15,
        'Q': 0.10,
        'Z': 0.07,
        'C': 2.78
    }

    #store the message / text
    message=text

    #Find the frequency of each text in the string
    freq=dict()
    for i in message:
        #ignore all forms of punctuation : given.
        if i in [' ','\n','.',',']:
            continue
        
        #check if key i exists in the dictionary, if so increment its count. If not initialize it to a count of 1.
        if i in freq:
            freq[i]+=1
        else:
            freq[i]=1

    #Print out the word frequencies.
    freq = {k: freq[k] for k in sorted(freq, reverse=False)}
    print("Sorted by keys (descending):")
    print(freq)
    
    # Extract keys and values from the dictionary
    characters = list(freq.keys())
    counts = list(freq.values())

    # Create a bar plot
    plt.figure(figsize=(10, 6))
    plt.bar(characters, counts, color='skyblue')

    # Add labels and title
    plt.xlabel('Characters')
    plt.ylabel('Frequency')
    plt.title('Frequency of Characters')

    plt.show()


text="""XACTZBGKU ZVK XADDKXSGBI ZBL USAVGBI CAVK GBJAVCZSGAB SHZB KQKV YKJAVK,
        XKCKBSGBI SHK GCTAVSZBXK AJ YASH LZSZ TVGQZXN ZBL LZSZ UKXRVGSN. BAP CAVK SHZB
        KQKV GS GU XVGSGXZD SA TVASKXS XABJGLKBSGZD GBJAVCZSGAB ZBL KBURVK YRUGBKUU
        XABSGBRGSN SHVARIH Z VAYRUS LZSZ TVASKXSGAB USVZSKIN. PK UHARDL XAQKV SHK EKN
        XABXKTSU AJ LZSZ TVGQZXN ZBL LZSZ UKXRVGSN SA HKDT LGJJKVKBSGZSK SHK SPA. SHK SKVCU
        LZSZ TVGQZXN ZBL LZSZ UKXRVGSN ZVK AJSKB CGURBLKVUSAAL ZBL RUKL GBSKVXHZBIKZYDN.
        HAPKQKV, SHKN ZVK SPA UKTZVZSK XABXKTSU SHZS PAVE GB SZBLKC SA EKKT LZSZ UZJK. LZSZ
        TVGQZXN JAXRUKU AB HAP GBJAVCZSGAB GU HZBLDKL, USAVKL, ZBL RUKL. PHGDK LZSZ
        UKXRVGSN GU XABXKVBKL PGSH TVASKXSGBI SHK ZUUKS AJ NARV AVIZBGMZSGAB."""




decrypt(text)