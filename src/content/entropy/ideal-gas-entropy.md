---
id: ideal-gas-entropy
section: entropy
order: 2
title: 理想気体のΔS（ds式の導出）
formula: Δs = cv ln(T₂/T₁) + R ln(v₂/v₁)
issue: 474
year: 2026
prereq: [clausius]
---

# 理想気体のΔS（ds 式の導出）

> **ゴール**: 第一法則 $\delta q=du+p\,dv$ と $dS=\delta q_{rev}/T$ から $ds=c_v\dfrac{dT}{T}+R\dfrac{dv}{v}$ を組み立て、積分して $\Delta s=c_v\ln\dfrac{T_2}{T_1}+R\ln\dfrac{v_2}{v_1}$ を出せる。$c_p$ 版・$p$ 版も即座に書ける。

## 物理状況

理想気体の任意の2状態間のエントロピー変化を、状態量 $(T,v)$ や $(T,p)$ の比だけで表す公式を作る。$S$ は状態量なので、実際の過程が可逆か不可逆かに関係なく、$T$ と $v$（または $p$）の始終値さえ分かれば $\Delta s$ が計算できる。これがエントロピー計算の主力公式になる。

@@FIG:ts-area@@

## 設定

理想気体 $1\,\mathrm{kg}$。比熱は一定とする。状態方程式 $pv=RT$、内部エネルギー $du=c_v\,dT$（理想気体は $u$ が $T$ だけの関数）、第一法則 $\delta q=du+p\,dv$。

## ステップ1: 第一法則を $dS$ に入れる

可逆過程の熱を第一法則で書き、$dS=\delta q_{rev}/T$ に代入する：

$$
dS=\frac{\delta q_{rev}}{T}=\frac{du+p\,dv}{T}
$$

## ステップ2: 理想気体の関係を代入

$du=c_v\,dT$ と、状態方程式から $\dfrac{p}{T}=\dfrac{R}{v}$ を使う：

$$
ds=\frac{c_v\,dT}{T}+\frac{p}{T}\,dv
=c_v\frac{dT}{T}+R\frac{dv}{v}
$$

## ステップ3: 積分する

比熱一定として 1→2 を積分する。$\displaystyle\int\frac{dT}{T}=\ln T$、$\displaystyle\int\frac{dv}{v}=\ln v$ より、

$$
\boxed{\,\Delta s=c_v\ln\frac{T_2}{T_1}+R\ln\frac{v_2}{v_1}\,}
$$

## ステップ4: $c_p$・$p$ 版に書き換える

エンタルピー基準 $\delta q=dh-v\,dp$、$dh=c_p\,dT$、$\dfrac{v}{T}=\dfrac{R}{p}$ を使うと、同じ手順で

$$
ds=c_p\frac{dT}{T}-R\frac{dp}{p}
\;\Longrightarrow\;
\boxed{\,\Delta s=c_p\ln\frac{T_2}{T_1}-R\ln\frac{p_2}{p_1}\,}
$$

両者は $pv=RT$ とマイヤー $c_p-c_v=R$ で互いに移り合う（$\dfrac{T_2}{T_1}=\dfrac{p_2 v_2}{p_1 v_1}$ を代入すれば一致を確認できる）。

## 結論

$$
\boxed{\;\Delta s=c_v\ln\frac{T_2}{T_1}+R\ln\frac{v_2}{v_1}
=c_p\ln\frac{T_2}{T_1}-R\ln\frac{p_2}{p_1}\;}
$$

> **ポイント**: 与えられた量（$T,v$ か $T,p$ か）に合う方を選べば一発。**等温なら第1項が消えて $\Delta s=R\ln(v_2/v_1)$、可逆断熱なら $\Delta s=0$**（$c_v\ln(T_2/T_1)=-R\ln(v_2/v_1)$ がちょうど打ち消す＝ポアソンの関係に一致）。ここがエントロピー計算の核。

