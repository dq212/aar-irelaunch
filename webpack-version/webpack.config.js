const path = require('path');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename:'bundle.js'
  },
  module: {
   rules: [
     {
      test: /\.css$/,
      use: ['style-loader','css-loader']
      },  
      
      {
      test: /\.scss$/,
      use: [
          {loader:'style-loader'},
          {loader: 'css-loader?sourceMap'},
          {loader: 'sass-loader?sourceMap'}
        ]
      },

    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: 'file-loader',
      exclude: /node_modules/,
      options:{
        name: '[path][name].[ext]',
       outputPath: ''
      }
    },

    // {
    //   test: /\.(woff|woff2|eot|ttf|svg)$/,
    //   loader:'url-loader?limit=10000',
    //   options: {
    //          name: '[path][name].[ext]',
    //          outputPath: 'fonts/',
    //         }
    // },
    // {
    //   test: /\.(woff|woff2|eot|ttf|svg)$/,
    //   loader: 'file-loader',
    //   options: {
    //          name: '[path][name].[ext]',
    //         }
    // },
    {
      test:/\.js$/, loader: 'babel-loader',
      exclude: /node_modules/,
      query:{presets:['es2015']}
    },
    // {
    //     test: /\.generated.(ttf|eot|woff|woff2|svg)$/,
    //     use: [{
    //       loader: 'file-loader',
    //       options: {
    //         outputPath: 'fonts/',
    //       },
    //     }],
    //   }
   ]
 },

 plugins: [
   // Copy the images folder and optimize all the images
   new CopyWebpackPlugin([{
     exclude: /node_modules/,
     from: './src/imgs/',
    //  from: './src/fonts/'
     
   }]),
   new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })

 ]


}
