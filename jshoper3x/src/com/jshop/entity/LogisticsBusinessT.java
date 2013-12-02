package com.jshop.entity;

// Generated 2013-12-2 20:43:53 by Hibernate Tools 3.4.0.CR1

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * LogisticsBusinessT generated by hbm2java
 */
@Entity
@Table(name = "logistics_business_t", catalog = "jshoper3")
public class LogisticsBusinessT implements java.io.Serializable {

	private String logisticsid;
	private String logisticsname;
	private String address;
	private String contractor;
	private String telno;
	private String faxno;
	private String email;
	private String receiver;
	private String bankaddress;
	private String bankaccount;
	private Date createtime;
	private String creatorid;
	private String des;
	private String insure;
	private String isCod;
	private String visible;
	private String state;
	private String city;
	private String website;
	private String sendrange;
	private String mobile;

	public LogisticsBusinessT() {
	}

	public LogisticsBusinessT(String logisticsid, String logisticsname,
			String contractor, String receiver, Date createtime,
			String creatorid, String state) {
		this.logisticsid = logisticsid;
		this.logisticsname = logisticsname;
		this.contractor = contractor;
		this.receiver = receiver;
		this.createtime = createtime;
		this.creatorid = creatorid;
		this.state = state;
	}

	public LogisticsBusinessT(String logisticsid, String logisticsname,
			String address, String contractor, String telno, String faxno,
			String email, String receiver, String bankaddress,
			String bankaccount, Date createtime, String creatorid, String des,
			String insure, String isCod, String visible, String state,
			String city, String website, String sendrange, String mobile) {
		this.logisticsid = logisticsid;
		this.logisticsname = logisticsname;
		this.address = address;
		this.contractor = contractor;
		this.telno = telno;
		this.faxno = faxno;
		this.email = email;
		this.receiver = receiver;
		this.bankaddress = bankaddress;
		this.bankaccount = bankaccount;
		this.createtime = createtime;
		this.creatorid = creatorid;
		this.des = des;
		this.insure = insure;
		this.isCod = isCod;
		this.visible = visible;
		this.state = state;
		this.city = city;
		this.website = website;
		this.sendrange = sendrange;
		this.mobile = mobile;
	}

	@Id
	@Column(name = "LOGISTICSID", unique = true, nullable = false, length = 20)
	public String getLogisticsid() {
		return this.logisticsid;
	}

	public void setLogisticsid(String logisticsid) {
		this.logisticsid = logisticsid;
	}

	@Column(name = "LOGISTICSNAME", nullable = false, length = 45)
	public String getLogisticsname() {
		return this.logisticsname;
	}

	public void setLogisticsname(String logisticsname) {
		this.logisticsname = logisticsname;
	}

	@Column(name = "ADDRESS")
	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "CONTRACTOR", nullable = false, length = 45)
	public String getContractor() {
		return this.contractor;
	}

	public void setContractor(String contractor) {
		this.contractor = contractor;
	}

	@Column(name = "TELNO", length = 20)
	public String getTelno() {
		return this.telno;
	}

	public void setTelno(String telno) {
		this.telno = telno;
	}

	@Column(name = "FAXNO", length = 20)
	public String getFaxno() {
		return this.faxno;
	}

	public void setFaxno(String faxno) {
		this.faxno = faxno;
	}

	@Column(name = "EMAIL", length = 100)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "RECEIVER", nullable = false, length = 45)
	public String getReceiver() {
		return this.receiver;
	}

	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}

	@Column(name = "BANKADDRESS", length = 45)
	public String getBankaddress() {
		return this.bankaddress;
	}

	public void setBankaddress(String bankaddress) {
		this.bankaddress = bankaddress;
	}

	@Column(name = "BANKACCOUNT", length = 45)
	public String getBankaccount() {
		return this.bankaccount;
	}

	public void setBankaccount(String bankaccount) {
		this.bankaccount = bankaccount;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATETIME", nullable = false, length = 0)
	public Date getCreatetime() {
		return this.createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	@Column(name = "CREATORID", nullable = false, length = 20)
	public String getCreatorid() {
		return this.creatorid;
	}

	public void setCreatorid(String creatorid) {
		this.creatorid = creatorid;
	}

	@Column(name = "DES", length = 200)
	public String getDes() {
		return this.des;
	}

	public void setDes(String des) {
		this.des = des;
	}

	@Column(name = "INSURE", length = 1)
	public String getInsure() {
		return this.insure;
	}

	public void setInsure(String insure) {
		this.insure = insure;
	}

	@Column(name = "IS_COD", length = 1)
	public String getIsCod() {
		return this.isCod;
	}

	public void setIsCod(String isCod) {
		this.isCod = isCod;
	}

	@Column(name = "VISIBLE", length = 1)
	public String getVisible() {
		return this.visible;
	}

	public void setVisible(String visible) {
		this.visible = visible;
	}

	@Column(name = "STATE", nullable = false, length = 1)
	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Column(name = "CITY", length = 45)
	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@Column(name = "WEBSITE")
	public String getWebsite() {
		return this.website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	@Column(name = "SENDRANGE", length = 1)
	public String getSendrange() {
		return this.sendrange;
	}

	public void setSendrange(String sendrange) {
		this.sendrange = sendrange;
	}

	@Column(name = "MOBILE", length = 20)
	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

}
