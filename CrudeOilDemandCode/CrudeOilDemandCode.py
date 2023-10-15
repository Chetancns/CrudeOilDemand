import os
import pandas as pd
import numpy as np
import sklearn
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
import openpyxl as ox
import matplotlib.pyplot as plt
print(sklearn.__version__)

#DataSet File
file_path = '.\\RefDocs\\DataSet.xlsx'
data = pd.read_excel(file_path)
df_old = pd.DataFrame({'Country':data['Country'],'Year':data['Year'],'Demand':data['Demand']})
data = pd.get_dummies(data, columns=['Country'],prefix='name')
#print(data.head())
#print(data.info())
X = data.drop('Demand',axis=1)
y = data['Demand']

#Prediciton File
PFile_Path = '.\\RefDocs\\Prediction DataSet.xlsx'
Predict_data = pd.read_excel(PFile_Path)

Predict_datas = pd.get_dummies(Predict_data,columns=['Country'],prefix='name')
X_predict = Predict_datas

#Traning and Testing spilt for Traning the model
X_train,X_test,y_train,y_test =train_test_split(X,y,test_size=0.3,random_state=42)


gbr_params= {'n_estimators':150,'max_depth':3,'min_samples_split':5,'learning_rate':0.05,'loss':'huber'}
gbr = GradientBoostingRegressor(**gbr_params)
gbr.fit(X_train,y_train)

print("Model Accureary: %3f "%gbr.score(X_test,y_test))

y_pred = gbr.predict(X_test)
#print(X_test);
mse = mean_squared_error(y_test,y_pred)
print(mse)

training_losses = []
test_losses = []

 

# Train the model and calculate losses at each stage
for y_pred_train, y_pred_test in zip(gbr.staged_predict(X_train), gbr.staged_predict(X_test)):
    training_loss = mean_squared_error(y_train, y_pred_train)
    test_loss = mean_squared_error(y_test, y_pred_test)
    training_losses.append(training_loss)
    test_losses.append(test_loss)



# Plot the training and test loss
x_values = np.arange(1, len(training_losses) + 1)
df_loss = pd.DataFrame({'Iteration':x_values,'training_loss':training_losses,'test_loss':test_losses})
plt.figure(figsize=(10, 6))
plt.plot(x_values, training_losses, label="Training Loss", color="blue")
plt.plot(x_values, test_losses, label="Test Loss", color="red")
plt.xlabel("Boosting Iterations")
plt.ylabel("Mean Squared Error (MSE)")
plt.title("Training and Test Deviance")
plt.legend()
figManager = plt.get_current_fig_manager()
figManager.window.state('zoomed')
plt.show()

# Plot the feature_importance
feature_importance = gbr.feature_importances_
feature_names = ['Year','EPI','GDP','Exports','Imports','Unemployment','Population','Per_Ca Energy','oil reserves']
feature_importance,feature_names = zip(*sorted(zip(feature_importance,feature_names),reverse=True))
plt.figure(figsize=(10,6))
plt.barh(range(len(feature_importance)),feature_importance,align="center")
plt.yticks(range(len(feature_importance)),feature_names)
plt.xlabel("feature_importance")
plt.title("feature_importance")
figManager = plt.get_current_fig_manager()
figManager.window.state('zoomed')
plt.show()

df_feature=pd.DataFrame({'feature_names':feature_names,'feature_importance':feature_importance})

#Prediting the demand based on the Trained model
v_pred = gbr.predict(X_predict)
df = pd.DataFrame({'Country':Predict_data['Country'],'Year':Predict_data['Year'],'Demand':v_pred })
df = pd.concat([df,df_old],ignore_index=True)

#Ploting the Demand for the World data
for country, data in df.groupby('Country'):
    plt.plot(data['Year'],data['Demand'],marker='o',markersize=8,label=country)
plt.xlabel("Year")
plt.ylabel("Demand (Barrels Per Day)")
plt.legend()
plt.title("Demand for Different Countries")
plt.grid(True,linestyle='--',alpha=0.6)
plt.legend()
plt.xticks(df['Year'].unique())
plt.yticks(range(0,int(df['Demand'].max()),1000))
plt.xticks(rotation=45)
figManager = plt.get_current_fig_manager()
figManager.window.state('zoomed')
plt.show()

#Dump the predicted output the excel
out_filepath = ".\\RefDocs\\Output.xlsx"
df.to_excel(out_filepath,sheet_name='Sheet1',index=False)

out_filepath= ".\\RefDocs\\loss.xlsx"
df_loss.to_excel(out_filepath,sheet_name='Sheet1',index=False);

out_filepath= ".\\RefDocs\\feature.xlsx"
df_feature.to_excel(out_filepath,sheet_name='Sheet1',index=False);

# Start the Program to Plot the Country wise Graph
import show


