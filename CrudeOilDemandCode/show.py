import pandas as pd
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import ttk


file_path = '.\\RefDocs\\Output.xlsx'
data1 = pd.read_excel(file_path)
df = pd.DataFrame({'Country':data1['Country'],'Year':data1['Year'],'Demand':data1['Demand'] })
#Method for Ploting the Country's Demand
def plot_data():
    Selected_country = country_dropdown.get()
    data = df[df['Country'] == Selected_country]
    #Close Previous plot figures
    plt.close('all')
    plt.figure(figsize=(10,6))
    plt.plot(data['Year'],data['Demand'],marker='o',markersize=8,label=Selected_country)
    plt.xlabel("Year")
    plt.ylabel("Demand (Barrels Per Day)")
    plt.legend()
    plt.title(f"Demand for {Selected_country}")
    plt.grid(True,linestyle='--',alpha=0.6)
    plt.legend()
    plt.xticks(data['Year'].unique())
    plt.yticks(range(int(data['Demand'].min()),int(data['Demand'].max()),100))
    plt.xticks(rotation=45)
    root = tk.Tk()
    root.withdraw()
    window_w=root.winfo_screenwidth()
    window_h=root.winfo_screenheight()
    fig_manager = plt.get_current_fig_manager()
    fig_manager.window.wm_geometry(f"+{(window_w - fig_manager.window.winfo_width())//4}+{(window_h - fig_manager.window.winfo_height())//4}")
    plt.show()

#Root Window which holds all the components.
root = tk.Tk()
root.title("Crude Oil Demand Visualization")
unique_countries =[country for country in df['Country'].unique()]
custom_font = ('Cursive',16)
country_lable = ttk.Label(root,text="Select a country:",foreground='blue')
country_lable.config(font=custom_font)
country_lable.pack()
style = ttk.Style()
style.configure('TCombobox',background='lightgray',foreground='blue',padding=(10,5))
country_dropdown = ttk.Combobox(root, values=unique_countries,background='black',foreground='blue')
custom_font = ('Helvetica',12)
country_dropdown.config(font=custom_font,width=20,height=25)
country_dropdown.pack()
root.tk_setPalette(background='white',foreground='black')
root.geometry("1920x1080")
root.geometry("+0+0")
style.theme_use('clam')
plot_button = ttk.Button(root, text="Plot",command=plot_data,padding=(10,5))
plot_button.pack()

root.mainloop()